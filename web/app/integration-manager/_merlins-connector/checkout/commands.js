/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeJsonEncodedRequest, makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {SubmissionError} from 'redux-form'

import {parseShippingInitialValues, parseLocations, parseShippingMethods, checkoutConfirmationParser} from './parsers'
import {parseCartTotals} from '../cart/parser'
import {parseCheckoutEntityID, extractMagentoShippingStepData} from '../../../utils/magento-utils'
import {getCart} from '../cart/commands'
import {
    receiveCheckoutData,
    receiveCheckoutLocations,
    receiveShippingInitialValues,
    receiveCheckoutConfirmationData,
    receiveBillingInitialValues,
    receiveShippingMethods
} from './../../checkout/results'
import {receiveCartContents} from './../../cart/results'
import {fetchPageData} from '../app/commands'
import {getCustomerEntityID, getCartBaseUrl} from '../selectors'
import {receiveEntityID} from '../actions'
import {PAYMENT_URL} from '../config'
import {ADD_NEW_ADDRESS_FIELD} from '../../../containers/checkout-shipping/constants'
import * as shippingSelectors from '../../../store/checkout/shipping/selectors'
import {prepareEstimateAddress} from '../utils'

export const fetchShippingMethodsEstimate = (inputAddress) => (dispatch, getState) => {
    const cartBaseUrl = getCartBaseUrl(getState())
    const address = prepareEstimateAddress(inputAddress)

    return makeJsonEncodedRequest(
        `${cartBaseUrl}/estimate-shipping-methods`,
        {address},
        {method: 'POST'}
    )
        .then((response) => response.json())
        .then((responseJSON) => parseShippingMethods(responseJSON))
        .then((shippingMethods) => {
            dispatch(receiveShippingMethods(shippingMethods))
            dispatch(receiveShippingInitialValues({address: {
                shipping_method: shippingMethods[0].id,
                postcode: address.postcode
            }})) // set initial value for method and postcode
        })
}

const processCheckoutData = ($response) => (dispatch) => {
    dispatch(receiveEntityID(parseCheckoutEntityID($response)))
    const magentoFieldData = extractMagentoShippingStepData($response)
          .getIn(['children', 'shipping-address-fieldset', 'children'])

    dispatch(receiveCheckoutLocations(parseLocations(magentoFieldData)))
    dispatch(receiveCheckoutData({
        shipping: {
            initialValues: parseShippingInitialValues(magentoFieldData)
        }
    }))
}

export const initCheckoutShippingPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => dispatch(processCheckoutData($response)))  // eslint-disable-line no-unused-vars
        .then(() => dispatch(fetchShippingMethodsEstimate({})))
}

export const initCheckoutConfirmationPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            dispatch(receiveCheckoutConfirmationData(checkoutConfirmationParser($, $response)))
            dispatch(getCart())
        })
}

export const submitShipping = (formValues) => (dispatch, getState) => {
    const currentState = getState()
    const savedAddress = formValues.saved_address
    const submittingWithNewAddress = savedAddress === ADD_NEW_ADDRESS_FIELD || savedAddress === undefined
    let address

    // Format the shipping address according to whether it's a saved or new address
    if (submittingWithNewAddress) {
        const {name} = formValues
        const names = name.split(' ')
        const newAddress = formValues

        address = {
            firstname: names.slice(0, -1).join(' '),
            lastname: names.slice(-1).join(' '),
            company: newAddress.company || '',
            telephone: newAddress.telephone,
            postcode: newAddress.postcode,
            city: newAddress.city,
            street: newAddress.addressLine2
                ? [newAddress.addressLine1, newAddress.addressLine2]
                : [newAddress.addressLine1],
            regionId: newAddress.regionId,
            region: newAddress.region,
            countryId: newAddress.countryId,
            saveInAddressBook: true
        }
    } else {
        const {saved_address} = formValues
        const savedAddress = shippingSelectors.getSavedAddresses(currentState).toJS()
            .filter(({customerAddressId}) => {
                return parseInt(customerAddressId) === parseInt(saved_address)
            })[0] || {}

        address = {
            ...savedAddress,
            region: savedAddress.region,
            saveInAddressBook: false
        }

        delete address.default_billing
        delete address.default_shipping
    }

    // Prepare and then run Shipping Information request
    const {shipping_method} = formValues
    const shippingSelections = shipping_method.split('_')
    const addressData = {
        addressInformation: {
            shippingAddress: address,
            billingAddress: {
                ...address,
                saveInAddressBook: false
            },
            shipping_carrier_code: shippingSelections[0],
            shipping_method_code: shippingSelections[1]
        }
    }
    const cartBaseUrl = getCartBaseUrl(currentState)
    const persistShippingURL = `${cartBaseUrl}/shipping-information`
    return makeJsonEncodedRequest(persistShippingURL, addressData, {method: 'POST'})
        .then((response) => {
            if (response.status === 400) {
                throw Error(`Error submitting shipping information: ${response.statusText}`)
            }
            return response.json()
        })
        .then((responseJSON) => {
            if (!responseJSON.payment_methods) {
                throw new SubmissionError({_error: 'Unable to save shipping address'})
            }

            dispatch(receiveCartContents(parseCartTotals(responseJSON.totals)))
            return PAYMENT_URL
        })
}

export const initCheckoutPaymentPage = (url) => (dispatch, getState) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res // eslint-disable-line no-unused-vars
            const addressData = shippingSelectors.getInitialShippingAddress(getState())
            dispatch(receiveBillingInitialValues({initialValues: {...addressData, billing_same_as_shipping: true}}))
            return dispatch(processCheckoutData($response))
        })
}

export const submitPayment = (formValues) => (dispatch, getState) => {
    const currentState = getState()
    const cartBaseUrl = getCartBaseUrl(currentState)
    const entityID = getCustomerEntityID(currentState)
    const {
        firstname,
        lastname,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        region,
        regionId,
        postcode,
        customerAddressId,
        customerId
    } = formValues
    const address = {
        firstname,
        lastname,
        customerAddressId: `${customerAddressId}`,
        customerId: `${customerId}`,
        company: company || '',
        postcode,
        city,
        street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1],
        regionId,
        region,
        countryId,
        saveInAddressBook: false
    }

    const paymentInformation = {
        billingAddress: {
            ...address
        },
        cartId: entityID,
        email: formValues.username,
        paymentMethod: {
            additional_data: null,
            method: 'checkmo',
            po_number: null
        }
    }

    const persistPaymentURL = `${cartBaseUrl}/payment-information`
    // Save payment address for confirmation
    dispatch(receiveCheckoutData({payment: {address}}))
    return makeJsonEncodedRequest(persistPaymentURL, paymentInformation, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON) => {
            // Looks like when it is successful, the responseJSON is a number
            if (/^\d+$/.test(responseJSON)) {
                return '/checkout/onepage/success/'
            } else {
                throw new Error(responseJSON.message)
            }
        })
}

export const fetchSavedShippingAddresses = () => {
    return (dispatch) => {
        const fetchURL = `/rest/default/V1/carts/mine`
        return makeRequest(fetchURL, {method: 'GET'})
            .then((response) => response.json())
            .then(({customer}) => {
                let defaultShippingId
                const addresses = customer.addresses.map((address) => {
                    if (address.default_shipping) {
                        defaultShippingId = address.id
                    }

                    // Not spreading `address` because it has key/values that
                    // we want to rename and remove
                    return {
                        city: address.city,
                        countryId: address.country_id,
                        customerAddressId: `${address.id}`,
                        customerId: `${address.customer_id}`,
                        firstname: address.firstname,
                        lastname: address.lastname,
                        postcode: address.postcode,
                        regionCode: address.region.region_code,
                        regionId: `${address.region.region_id}`,
                        region: address.region.region,
                        street: address.street,
                        telephone: address.telephone,
                    }
                })

                dispatch(setDefaultShippingAddressId(defaultShippingId))
                dispatch(receiveSavedShippingAddresses(addresses))
            })
    }
}
