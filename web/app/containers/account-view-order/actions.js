/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {reorderPreviousOrder} from 'progressive-web-sdk/dist/integraton-manager/account/commands'
import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {getCurrentOrderId} from '../../store/user/orders/selectors'

export const reorderItem = () => (dispatch, getState) => {
    return reorderPreviousOrder(getCurrentOrderId(getState()))
        .then((url) => {
            browserHistory.push({
                pathname: url
            })
        })
}
