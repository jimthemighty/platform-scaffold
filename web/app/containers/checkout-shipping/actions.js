/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/namespace */
/* eslint-disable import/named */
import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

import {splitFullName} from '../../utils/utils'
import {receiveCheckoutData, receiveShippingAddress, receiveSelectedShippingMethod} from '../../integration-manager/checkout/results'


import {
    submitShipping as submitShippingCommand,
    fetchShippingMethodsEstimate
} from '../../integration-manager/checkout/commands'
import {customCommands} from '../../integration-manager/custom/commands'
import {login} from '../../integration-manager/account/commands'

import {getShippingFormValues, getShippingEstimateAddress} from '../../store/form/selectors'
import {addNotification, removeNotification} from 'progressive-web-sdk/dist/store/notifications/actions'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields (Shipping)')
export const setCustomerEmailRecognized = createAction('Set Customer email Recognized', ['customerEmailRecognized'])
export const setShowAddNewAddress = createAction('Setting the "Saved/New Address" field', ['showAddNewAddress'])
export const receiveData = createAction('Receive Checkout Shipping Data')

const WELCOME_BACK_NOTIFICATION_ID = 'shippingWelcomeBackMessage'

const onShippingEmailRecognized = () => (dispatch) => {
    dispatch(setCustomerEmailRecognized(true))
    dispatch(addNotification(
        WELCOME_BACK_NOTIFICATION_ID,
        'Welcome back! Sign in for a faster checkout or continue as a guest.',
        true
    ))
}

const onShippingEmailAvailable = () => (dispatch) => {
    dispatch(removeNotification(WELCOME_BACK_NOTIFICATION_ID))
    return dispatch(setCustomerEmailRecognized(false))
}

export const onShippingLoginError = (errorMessage) =>
    addNotification(
        'shippingEmailError',
        errorMessage,
        true
    )

export const submitSignIn = () => (dispatch, getState) => {
    const {
        username,
        password
    } = getShippingFormValues(getState())
    return dispatch(login(username, password, 'on'))
        .catch((error) => dispatch(onShippingLoginError(error.message)))
}

export const submitShipping = () => (dispatch, getState) => {
    const currentState = getState()
    const {
        name,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        postcode,
        telephone,
        shippingMethodId,
        username
    } = getShippingFormValues(currentState)
    const {firstname, lastname} = splitFullName(name)
    const address = {
        firstname,
        lastname,
        name,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        postcode,
        telephone,
    }

    if (username) {
        dispatch(receiveCheckoutData({emailAddress: username}))
    }
    dispatch(receiveSelectedShippingMethod(shippingMethodId))
    dispatch(receiveShippingAddress(address))
    return dispatch(submitShippingCommand({...address, shippingMethodId}))
        .then((paymentURL) => {
            browserHistory.push({
                pathname: paymentURL
            })
        })
        .catch(() => {
            dispatch(addNotification(
                'submitShippingError',
                `Unable to save shipping information. Please, check input data.`,
                true
            ))
        })
}

export const isEmailAvailable = () => (dispatch, getState) => {
    const formValues = getShippingFormValues(getState())

    if (customCommands.isEmailAvailable) {
        return dispatch(customCommands.isEmailAvailable(formValues.username))
        .then((emailAvailable) => {
            if (emailAvailable) {
                return dispatch(onShippingEmailAvailable())
            }
            return dispatch(onShippingEmailRecognized())
        })
    }

    return dispatch(onShippingEmailAvailable())
}

export const fetchShippingMethods = () => (dispatch, getState) => (
    dispatch(
        fetchShippingMethodsEstimate(getShippingEstimateAddress(getState()))
    )
)
