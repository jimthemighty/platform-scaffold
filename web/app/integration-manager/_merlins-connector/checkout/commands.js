/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {SubmissionError} from 'redux-form'
import {createSelector} from 'reselect'

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
import {getCustomerEntityID} from '../selectors'
import {receiveEntityID} from '../actions'
import {PAYMENT_URL} from '../config'
import {ADD_NEW_ADDRESS_FIELD} from '../../../containers/checkout-shipping/constants'
import {getFormValues, isRegionFreeform} from '../../../store/form/selectors'
import {getIsLoggedIn} from '../../../store/user/selectors'
import {SHIPPING_FORM_NAME} from '../../../store/form/constants'
import * as shippingSelectors from '../../../store/checkout/shipping/selectors'

const getCartBaseUrl = createSelector(
    getIsLoggedIn,
    getCustomerEntityID,
    (isLoggedIn, entityID) => `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}`
)

const formValuesToAddress = (formValues = {}, freeformRegion) => {
    const {
        countryId = 'US',
        regionId = '0',
        region,
        postcode = null
    } = formValues

    const address = {
        country_id: countryId,
        postcode
    }

    if (freeformRegion) {
        address.region = region
    } else {
        address.region_id = regionId
    }

    return address
}

export const fetchShippingMethodsEstimate = (formKey) => (dispatch, getState) => {
    const currentState = getState()
    const cartBaseUrl = getCartBaseUrl(currentState)
    const formValues = getFormValues(formKey)(currentState)
    const freeformRegion = isRegionFreeform(formKey)(currentState)

    // @TODO: We should probably pull this data from the STATE instead of form
    //        fields since there might not be fields, i.e. w/ Saved Addresses
    const address = formValuesToAddress(formValues, freeformRegion)

    const estimateURL = `${cartBaseUrl}/estimate-shipping-methods`
    return makeJsonEncodedRequest(estimateURL, {address}, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON) => {
            const shippingMethods = parseShippingMethods(responseJSON)
            const initialValues = {
                shipping_method: shippingMethods[0].id,
                postcode: address.postcode
            }

            dispatch(receiveShippingMethods(shippingMethods))
            dispatch(receiveShippingInitialValues({address: initialValues})) // set initial value for method
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
        .then(() => dispatch(fetchShippingMethodsEstimate(SHIPPING_FORM_NAME)))
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
    const entityID = getCustomerEntityID(currentState)
    const isLoggedIn = getIsLoggedIn(currentState)
    const persistShippingURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/shipping-information`
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

export const isEmailAvailable = (email) => (dispatch) => {
    return makeJsonEncodedRequest(
            '/rest/default/V1/customers/isEmailAvailable',
            {customerEmail: email},
            {method: 'POST'}
        )
        .then((response) => response.text())
        .then((responseText) => {
            return /true/.test(responseText)
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
    const entityID = getCustomerEntityID(currentState)
    const isLoggedIn = getIsLoggedIn(currentState)
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

    const persistPaymentURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/payment-information`
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
