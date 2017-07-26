/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
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
    return dispatch(addAddress(formValues))
}

export const submitEditAddress = (formValues) => (dispatch) => {
    return dispatch(editAddress(formValues, formValues.id))
}

export const removeAddress = (id) => (dispatch) => dispatch(deleteAddress(id))
