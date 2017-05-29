/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {getForm} from '../selectors'

import {
    ADD_TO_CART_FORM_NAME,
    CONFIRMATION_FORM_NAME,
    ESTIMATE_FORM_NAME,
    PAYMENT_FORM_NAME,
    SHIPPING_FORM_NAME
} from './constants'

const getFormByKey = (formKey) => createSelector(
    getForm,
    (form) => { return form[formKey] ? form[formKey] : {} }
)
export const getFormValues = (formKey) => createSelector(
    getFormByKey(formKey),
    ({values}) => values || {}
)

export const getFormRegisteredFields = (formKey) => createSelector(
    getFormByKey(formKey),
    ({registeredFields}) => { return registeredFields ? registeredFields : [] }
)

export const isRegionFreeform = (formName) => createSelector(
    getFormRegisteredFields(formName),
    (fields) => fields.some(({name}) => name === 'region')
)

export const getFormAddressValues = (formKey) => createSelector(
    getFormValues(formKey),
    isRegionFreeform(formKey),
    ({countryId, regionId, region, postcode}, freeformRegion) => {
        const address = {
            countryId,
            postcode
        }

        if (freeformRegion) {
            address.region = region
        } else {
            address.regionId = regionId
        }

        return address
    }
)

export const getEstimateShippingAddress = getFormAddressValues(ESTIMATE_FORM_NAME)

export const getShippingFormValues = getFormValues(SHIPPING_FORM_NAME)

export const getShippingEstimateAddress = getFormAddressValues(SHIPPING_FORM_NAME)

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
export const getCouponForm = createSelector(getForm, (form) => form.cartPromoForm)
export const getCouponValue = createSelector(getCouponForm, (cartPromoForm) => {
    return cartPromoForm ? cartPromoForm.values.promo : undefined
})
