/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
import {getUser} from 'progressive-web-sdk/dist/store/user/selectors'

export const getAccountOrderList = createSelector(
    getUi,
    ({accountOrderList}) => accountOrderList
)

export const getTitle = createGetSelector(getAccountOrderList, 'title')

const PLACEHOLDER = {
    text: undefined
}

export const getOrderList = createSelector(getUser, (user) => {
    return user.get('orders') ? user
        .get('orders')
        .toIndexedSeq()
        .toArray()
        .map((order) => order.toJS()) : new Array(3).fill(PLACEHOLDER)
})
