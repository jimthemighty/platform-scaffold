/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {validateFullName} from '../../utils/utils'
import {updateAccountInfo} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {addNotification} from 'progressive-web-sdk/dist/store/notifications/actions'

export const receiveData = createAction('Receive AccountInfo data')

// This action will change the `title` key in the local private state
export const changeTitle = createAction('Change AccountInfo title', 'title')

export const submitAccountInfoForm = (formValues) => (dispatch) => {
    if (validateFullName(formValues.names)) {
        dispatch(updateAccountInfo(formValues))
            .then(() => {
                return dispatch(addNotification(
                    'accountInfoUpdated',
                    'Successfully updated account information',
                    true
                ))
            })
    }
}
