/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {openModal, closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {splitFullName} from '../../utils/utils'
import {addAddress, deleteAddress, editAddress} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {ACCOUNT_ADDRESS_MODAL} from '../../modals/constants'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
export const setAddressID = createAction('Set Address ID', ['addressID'])
export const setIsEditing = createAction('Set isEdit', ['isEdit'])

export const openAddressModal = () => {
    return (dispatch) => {
        dispatch(openModal(ACCOUNT_ADDRESS_MODAL))
    }
}

export const submitAddAddress = (formValues) => (dispatch) => {
    const {firstname, lastname} = splitFullName(formValues.name)

    return dispatch(addAddress({...formValues, firstname, lastname}))
        .then(() => dispatch(closeModal(ACCOUNT_ADDRESS_MODAL, UI_NAME.addNewAddress)))
}

export const submitEditAddress = (formValues) => (dispatch) => {
    const {firstname, lastname} = splitFullName(formValues.name)

    return dispatch(editAddress({...formValues, firstname, lastname}, formValues.id))
        .then(() => dispatch(closeModal(ACCOUNT_ADDRESS_MODAL, UI_NAME.editSavedAddress)))
}

export const removeAddress = (id) => (dispatch) => {
    return dispatch(deleteAddress(id))
}
