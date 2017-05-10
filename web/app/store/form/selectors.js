import {createSelector} from 'reselect'
import {getForm} from '../selectors'

import {
    ADD_TO_CART_FORM_NAME,
    CONFIRMATION_FORM_NAME,
    PAYMENT_FORM_NAME,
    SHIPPING_FORM_NAME
} from './constants'

export const getFormByKey = (formKey) => createSelector(getForm, (form) => { return form[formKey] ? form[formKey] : {} })
export const getFormValues = (formKey) => createSelector(getFormByKey(formKey), ({values}) => values)

export const getFormRegisteredFields = (formKey) => createSelector(getFormByKey(formKey), ({registeredFields}) => { return registeredFields ? registeredFields : [] })

export const getShippingFormValues = getFormValues(SHIPPING_FORM_NAME)
export const getPaymentBillingFormValues = getFormValues(PAYMENT_FORM_NAME)
export const getConfirmationFormValues = getFormValues(CONFIRMATION_FORM_NAME)
export const getAddToCartFormValues = getFormValues(ADD_TO_CART_FORM_NAME)
