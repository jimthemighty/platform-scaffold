/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {reorderPreviousOrder} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {browserHistory} from 'progressive-web-sdk/dist/routing'

export const receiveData = createAction('Receive AccountOrderList data')

export const reorderItems = (orderId) => (dispatch) => {
    return dispatch(reorderPreviousOrder(orderId))
        .then(() => {
            browserHistory.push({pathname: '/checkout/cart/'})
        })
}
