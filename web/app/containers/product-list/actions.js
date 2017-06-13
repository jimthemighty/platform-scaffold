/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {getCurrentPathKey} from '../app/selectors'
import {receiveCurrentProductId} from '../../integration-manager/results'

export const changeSelectedSort = createAction('Change Selected Sort Order')

export const changeSort = (sort) => (dispatch, getState) => {
    dispatch(changeSelectedSort({
        [getCurrentPathKey(getState())]: {sort}
    }))
}

export const setCurrentProductId = (id) => receiveCurrentProductId(id)
