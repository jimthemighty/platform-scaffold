/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {splitFullName} from '../../utils/utils'
import {addAddress} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {ADD_ADDRESS_MODAL} from '../../modals/constants'

export const receiveData = createAction('Receive AccountAddress data')

export const openAddAddressModal = () => {
    return (dispatch) => {
        dispatch(openModal(ADD_ADDRESS_MODAL))
    }
}

export const submitAddAddress = (formValues) => (dispatch) => {
    if (formValues.full_name) {
        const splitNames = splitFullName(formValues.full_name)
        formValues.firstname = splitNames.firstname
        formValues.lastname = splitNames.lastname
    }
    return dispatch(addAddress(formValues))
}

export const submitEditAddress = (formValues) => (dispatch) => { // eslint-disable-line
    return Promise.resolve()
}
