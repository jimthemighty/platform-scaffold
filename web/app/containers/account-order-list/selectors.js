/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi, getUser} from '../../store/selectors'

export const getAccountOrderList = createSelector(
    getUi,
    ({accountOrderList}) => accountOrderList
)

export const getTitle = createGetSelector(getAccountOrderList, 'title')

export const getOrderList = createSelector(getUser, (user) => {
    return user.get('orders') ? user
        .get('orders')
        .toIndexedSeq()
        .toArray()
        .map((order) => order.toJS()) : []
})
