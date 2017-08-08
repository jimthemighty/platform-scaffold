/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const mapHybrisToMobifyParam = (param) => {
    switch (param) {
        case 'email':
            return 'uid'
        case 'password':
            return 'password'
        case 'firstname':
            return 'firstName'
        case 'lastname':
            return 'lastName'
        default:
            return false
    }
}

export const getRegisterUserErrorData = (response) => {
    const errors = response.errors || {}
    const errorData = errors.reduce((acc, err) => {
        if (err.type === 'DuplicateUidError') {
            acc.email = 'This email already exists.'
        } else {
            const param = mapHybrisToMobifyParam(err.subject)
            if (param) {
                acc[param] = acc[param] || err.message
            }
        }
        return acc
    }, {})
    errorData._error = 'Unable to create account.'
    return errorData
}
