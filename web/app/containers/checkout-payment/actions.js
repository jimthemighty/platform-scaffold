/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {getPaymentBillingFormValues} from '../../store/form/selectors'
import {getEmailAddress} from '../../store/checkout/selectors'
import {getShippingAddress} from '../../store/checkout/shipping/selectors'
import {submitPayment as submitPaymentCommand} from '../../integration-manager/checkout/commands'
import {splitFullName} from '../../utils/utils'
import {receiveBillingAddress} from '../../integration-manager/checkout/results'

export const receiveContents = createAction('Received CheckoutPayment Contents')
export const toggleFixedPlaceOrder = createAction('Toggled the fixed "Place Order" container', ['isFixedPlaceOrderShown'])
export const toggleCardInputRadio = createAction('Toggled the card method radio input', ['isNewCardInputSelected'])
export const toggleCompanyAptField = createAction('Toggled the "Company" and "Apt #" fields (Payment)', ['isCompanyOrAptShown'])
export const toggleNewAddressFields = createAction('Toggled new address fields', ['newShippingAddressIsEnabled'])
export const setCvvType = createAction('Setting CVV type', ['cvvType'])

export const submitPayment = () => (dispatch, getState) => {
    const currentState = getState()
    const billingFormValues = getPaymentBillingFormValues(currentState)
    const billingIsSameAsShippingAddress = billingFormValues.billingSameAsShipping

    // Careful. This get's completely overwritten below
    let address = null
    const email = getEmailAddress(currentState)
    const paymentInfo = {
        ccname: billingFormValues.ccname,
        ccnumber: billingFormValues.ccnumber,
        ccexpiry: billingFormValues.ccexpiry,
        cvv: billingFormValues.cvv
    }


    if (billingIsSameAsShippingAddress) {
        address = {
            username: email,
            ...getShippingAddress(currentState).toJS(),
            sameAsShipping: true
        }
    } else {
        const {firstname, lastname} = splitFullName(billingFormValues.name)
        address = {
            firstname,
            lastname,
            ...billingFormValues,
        }
    }

    dispatch(receiveBillingAddress(address))
    return dispatch(submitPaymentCommand({...address, ...paymentInfo}))
        .then((url) => {
            browserHistory.push({
                pathname: url
            })
        })
}
