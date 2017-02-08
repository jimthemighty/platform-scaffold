import {browserHistory} from 'react-router'
import {createAction} from '../../utils/utils'
import checkoutShippingParser from './parsers/checkout-shipping'
import shippingMethodParser from './parsers/shipping-method'
import {addNotification} from '../app/actions'
import {getCustomerEntityID} from './selectors'
import {getShippingFormValues} from '../../store/form/selectors'

import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')

export const receiveData = createAction('Receive Checkout Shipping Data')
export const process = ({payload: {$, $response}}) => {
    return receiveData(checkoutShippingParser($, $response))
}


export const onShippingEmailRecognized = () => {
    return (dispatch) => {
        dispatch(addNotification({
            content: `Welcome back! Sign in for a faster checkout or continue as a guest.`,
            id: 'shippingWelcomeBackMessage',
            showRemoveButton: true
        }))
    }
}
// *** Temporarily hard coded - get this data from the state instead! ***
const isLoggedIn = false

export const fetchShippingMethods = () => {
    return (dispatch, getState) => {
        const formValues = getShippingFormValues(getState())
        const entityID = getCustomerEntityID(getState())
        // Default values to use if none have been selected
        const addressData = {country_id: 'US', region_id: '0', postcode: null}
        if (formValues) {
            addressData.country_id = formValues.country_id
            addressData.region_id = formValues.region_id
            addressData.postcode = formValues.postcode
        }
        const getEstimateURL = `https://www.merlinspotions.com/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/estimate-shipping-methods`
        makeJsonEncodedRequest(getEstimateURL, {address: addressData}, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                dispatch(receiveData({shippingMethods: shippingMethodParser(responseJSON)}))
            })
    }
}

export const submitShipping = () => {
    return (dispatch, getState) => {
        const {
            name,
            company,
            addressLine1,
            addressLine2,
            country_id,
            city,
            region_id,
            postcode,
            telephone,
            shipping_method
        } = getShippingFormValues(getState())
        const entityID = getCustomerEntityID(getState())
        const names = name.split(' ')
        const shippingSelections = shipping_method.split('_')
        const addressData = {
            firstname: names.slice(0, -1).join(' '),
            lastname: names.slice(-1).join(' '),
            company,
            telephone,
            postcode,
            city,
            street: [addressLine1, addressLine2],
            regionId: region_id,
            countryId: country_id
        }
        const addressInformation = {
            addressInformation: {
                shippingAddress: {
                    ...addressData,
                    saveInAddressBook: false
                },
                billingAddress: addressData,
                shipping_carrier_code: shippingSelections[0],
                shipping_method_code: shippingSelections[1]
            }
        }
        const persistShippingURL = `https://www.merlinspotions.com/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/shipping-information`
        makeJsonEncodedRequest(persistShippingURL, addressInformation, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.payment_methods) {
                    // To Do send response data to the next container
                    browserHistory.push({
                        pathname: '/checkout/payment/'
                    })
                }
            })
    }
}
