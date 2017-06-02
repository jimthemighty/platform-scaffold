/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getCheckoutConfirmation = createSelector(getUi, ({checkoutConfirmation}) => checkoutConfirmation)

export const getIsRegistrationFormHidden = createGetSelector(getCheckoutConfirmation, 'isRegistrationFormHidden')
export const getConfirmationData = createGetSelector(getCheckoutConfirmation, 'confirmationData')

export const getOrderNumber = createSelector(getConfirmationData, (data) => {
    return data ? data.get('orderNumber') : null
})

export const getOrderUrl = createGetSelector(getCheckoutConfirmation, 'orderUrl')
