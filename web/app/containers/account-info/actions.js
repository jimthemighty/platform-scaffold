/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {validateFullName} from '../../utils/utils'
import {updateAccountInfo, updateAccountPassword} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {addNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import {SubmissionError} from 'redux-form'

export const receiveData = createAction('Receive AccountInfo data')

// This action will change the `title` key in the local private state
export const changeTitle = createAction('Change AccountInfo title', 'title')

export const submitAccountInfoForm = (formValues) => (dispatch) => {
    const {currentPassword, newPassword, names, email} = formValues


    if (!validateFullName(names)) {
        return Promise.reject(new SubmissionError({
            _error: {
                names: 'Enter a different a valid full name'
            }
        }))
    }

    if (!(currentPassword && newPassword && email)) {
        return Promise.reject(new SubmissionError({
            _error: {
                email: 'Please enter an email'
            }
        }))
    }


    if (currentPassword && !newPassword) {
        return Promise.reject(new SubmissionError({
            _error: {
                newPassword: 'Please enter a new password'
            }
        }))
    }

    if (!currentPassword && newPassword) {
        return Promise.reject(new SubmissionError({
            _error: {
                currentPassword: 'Please enter your current password'
            }
        }))
    }

    if (currentPassword === newPassword) {
        return Promise.reject(new SubmissionError({
            _error: {
                newPassword: 'Enter a different new password'
            }
        }))
    }


    return dispatch(updateAccountInfo(formValues))
        .then(() => dispatch(updateAccountPassword(formValues)))
        .then(() => dispatch(addNotification(
                'accountInfoUpdated',
                'Successfully updated account information',
                true
            )))
        .catch((err) => {
            dispatch(addNotification(
                'accountInfoError',
                err.errors._error,
                true
            ))
        })
}
