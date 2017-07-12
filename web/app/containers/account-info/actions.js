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
    const {currentPassword, newPassword, names} = formValues

    if (currentPassword && !newPassword) {
        return Promise.reject(new SubmissionError({
            _error: {
                newPassword: 'please enter your new password'
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

    if (validateFullName(names)) {
        dispatch(updateAccountInfo(formValues))
            .then(() => dispatch(updateAccountPassword(formValues)))
            .then(() => dispatch(addNotification(
                    'accountInfoUpdated',
                    'Successfully updated account information',
                    true
                )))
    }

    return Promise.reject(new SubmissionError({
        _error: {
            newPassword: 'please enter a valid full name'
        }
    }))
}
