/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {openModal, closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {splitFullName} from '../../utils/utils'
import {addAddress, deleteAddress, editAddress} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {ACCOUNT_ADDRESS_MODAL} from '../../modals/constants'

export const setAddressID = createAction('Set Address ID', ['addressID'])
export const setIsEditing = createAction('Set isEdit', ['isEdit'])

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
        .then(() => dispatch(closeModal(ACCOUNT_ADDRESS_MODAL)))
}

export const submitEditAddress = (formValues) => (dispatch) => {
    const splitNames = splitFullName(formValues.name)
    formValues.firstname = splitNames.firstname
    formValues.lastname = splitNames.lastname

    return dispatch(editAddress(formValues, formValues.id))
        .then(() => dispatch(closeModal(ACCOUNT_ADDRESS_MODAL)))
}

export const removeAddress = (id) => (dispatch) => {
    return dispatch(deleteAddress(id))
}
