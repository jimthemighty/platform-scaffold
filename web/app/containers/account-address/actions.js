/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {splitFullName} from '../../utils/utils'
import {addAddress, deleteAddress} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {ACCOUNT_ADDRESS_MODAL} from '../../modals/constants'

export const setEdittingAddress = createAction('Set isEditting Address', ['isEditingAddress'])
export const setRemoveAddressID = createAction('Set Remove Address ID', ['removeAddressID'])

export const openAddressModal = () => {
    return (dispatch) => {
        dispatch(openModal(ACCOUNT_ADDRESS_MODAL))
    }
}

export const submitAddAddress = (formValues) => (dispatch) => {
    const splitNames = splitFullName(formValues.name)
    formValues.firstname = splitNames.firstname
    formValues.lastname = splitNames.lastname
    return dispatch(addAddress(formValues))
}

export const submitEditAddress = (formValues) => (dispatch) => { // eslint-disable-line
    return Promise.resolve()
}

export const removeAddress = (id) => (dispatch) => dispatch(deleteAddress(id))
