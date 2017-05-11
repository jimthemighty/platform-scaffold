import {SubmissionError} from 'redux-form'
import {createBasket} from '../cart/utils'
import {makeSfccRequest} from '../utils'
import {populateLocationsData} from './utils'
import {parseShippingAddressFromBasket} from './parsers'
import {API_END_POINT_URL, PAYMENT_URL} from '../constants'
import {STATES} from './constants'
import {receiveCheckoutData, receiveShippingInitialValues, receiveBillingInitialValues} from './../../checkout/results'

export const fetchShippingMethodsEstimate = () => (dispatch) => {
    return createBasket()
        .then((basket) => {
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}/shipments/me/shipping_methods`, {method: 'GET'})
                .then((response) => response.json())
                .then((responseJSON) => {
                    const shippingMethods = responseJSON.applicable_shipping_methods.map(({name, description, price, id}) => {
                        return {
                            label: `${name} - ${description}`,
                            cost: `$${price.toFixed(2)}`,
                            value: id
                        }
                    })

                    return dispatch(receiveCheckoutData({shipping: {shippingMethods}}))
                })
        })
}

export const fetchCheckoutShippingData = () => (dispatch) => {
    return createBasket()
        .then((basket) => {
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}`, {method: 'GET'})
                .then((response) => response.json())
                .then((responseJSON) => {
                    const {
                        customer_info: {
                            email
                        },
                        shipments: [{
                            shipping_address,
                            shipping_method
                        }]
                    } = responseJSON
                    let initialValues
                    /* eslint-disable camelcase */
                    if (shipping_address) {
                        initialValues = {
                            username: email,
                            name: shipping_address.full_name,
                            company: shipping_address.company_name,
                            addressLine1: shipping_address.address1,
                            addressLine2: shipping_address.address2,
                            countryId: shipping_address.country_code,
                            city: shipping_address.city,
                            regionId: shipping_address.state_code,
                            postcode: shipping_address.postal_code,
                            telephone: shipping_address.phone,
                            shipping_method: shipping_method ? shipping_method.id : undefined
                        }
                    } else {
                        initialValues = {
                            countryId: 'us'
                        }
                    }
                    dispatch(receiveShippingInitialValues({initialValues}))
                    /* eslint-enable camelcase */
                    return dispatch(receiveCheckoutData({
                        locations: {
                            countries: [{value: 'us', label: 'United States'}],
                            regions: STATES
                        }
                    }))
                })
                .then(() => dispatch(fetchShippingMethodsEstimate()))
        })
}

export const fetchCheckoutPaymentData = () => (dispatch) => {
    dispatch(populateLocationsData())
    return createBasket()
        .then((basket) => {
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}`, {method: 'GET'})
                .then((response) => response.json())
                .then((responseJSON) => {
                    const addressData = parseShippingAddressFromBasket(responseJSON)

                    dispatch(receiveShippingInitialValues({initialValues: addressData}))
                    dispatch(receiveBillingInitialValues({initialValues: {...addressData, billing_same_as_shipping: true}}))
                })
        })
}

export const submitShipping = (formValues) => (dispatch) => {
    const {
        name,
        firstname,
        lastname,
        username,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        postcode,
        telephone,
        shipping_method
    } = formValues
    return createBasket()
        .then((basket) => {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify({
                    email: username,
                    customer_name: name
                })
            }
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}/customer`, requestOptions)
                .then(() => basket.basket_id)
        })
        .then((basketID) => {
            const requestOptions = {
                method: 'PATCH',
                body: JSON.stringify({
                    shipping_address: {
                        address1: addressLine1,
                        address2: addressLine2,
                        city,
                        country_code: countryId,
                        first_name: firstname,
                        last_name: lastname,
                        full_name: name,
                        phone: telephone,
                        postal_code: postcode,
                        state_code: regionId,
                        company_name: company
                    },
                    shipping_method: {
                        id: shipping_method
                    }
                })
            }
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basketID}/shipments/me`, requestOptions)
                .then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.fault) {
                        throw new SubmissionError({_error: 'Unable to save shipping data'})
                    }

                    return PAYMENT_URL
                })
        })
}

// We're not currently checking the customer's email on the sfcc site
// Return true to prevent the welcome banner from showing
export const checkCustomerEmail = () => () => Promise.resolve(true)
