/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {addAddress} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {ADD_ADDRESS_MODAL} from '../../modals/constants'

export const receiveData = createAction('Receive AccountAddress data')

export const openAddAddressModal = () => {
    return (dispatch) => {
        dispatch(openModal(ADD_ADDRESS_MODAL))
    }
}

export const submitAddAddress = (formValues) => (dispatch) => {
    return dispatch(addAddress(formValues))
}

export const submitEditAddress = (formValues) => (dispatch) => { // eslint-disable-line
    return Promise.resolve()
}
