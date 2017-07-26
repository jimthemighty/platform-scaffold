/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'

import {
    ADD_TO_CART_FORM_NAME,
    CONFIRMATION_FORM_NAME,
    ESTIMATE_FORM_NAME,
    PAYMENT_FORM_NAME,
    SHIPPING_FORM_NAME
} from './constants'

import {getSavedAddresses} from 'progressive-web-sdk/dist/store/checkout/shipping/selectors'
import {getFormValues} from 'progressive-web-sdk/dist/store/form/selectors'

export const getEstimateShippingAddress = getFormValues(ESTIMATE_FORM_NAME)

export const getShippingFormValues = getFormValues(SHIPPING_FORM_NAME)

export const getShippingSavedAddressID = createSelector(getShippingFormValues, ({savedAddress}) => savedAddress)

export const getSelectedSavedShippingAddress = createSelector(
    getSavedAddresses,
    getShippingSavedAddressID,
    (savedAddresses, selectedAddressID) => savedAddresses.find((address) => address.get('id') === selectedAddressID)
)

export const getShippingEstimateAddress = getFormValues(SHIPPING_FORM_NAME)

export const getPaymentBillingFormValues = getFormValues(PAYMENT_FORM_NAME)
export const getPaymentBillingCCNumber = createSelector(getPaymentBillingFormValues, (form) => {
    let num
    if (form && 'ccnumber' in form) {
        num = form.ccnumber
    }
    return num
})
export const getConfirmationFormValues = getFormValues(CONFIRMATION_FORM_NAME)
export const getAddToCartFormValues = getFormValues(ADD_TO_CART_FORM_NAME)
