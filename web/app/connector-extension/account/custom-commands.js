import {receiveAccountCustomContent} from '../../integration-manager/account/results'

export const initAccountPage = (url, routeName) => (dispatch) => {
    // const requestOptions = {
    //     method: 'GET',
    //     body: JSON.stringify({
    //         password,
    //         customer: {
    //             first_name: firstname,
    //             last_name: lastname,
    //             login: email,
    //             email
    //         }
    //     })
    // }
    // let responseHeaders
    // return makeApiRequest('/customers', requestOptions)
    //     .then((response) => {
    //         responseHeaders = response.headers
    //         return response.json()
    //     })
    //     .then(({fault}) => {
    //         if (fault) {
    //             throw new SubmissionError({_error: 'Unable to create account.'})
    //         }
    //         const authorization = responseHeaders.get('Authorization')
    //         if (authorization) {
    //             storeAuthToken(authorization)
    //             return initSfccSession(authorization)
    //         }
    //         return Promise.resolve()
    //     })
    //     // Creating a user doesn't sign them in automatically, so dispatch the login command
    //     .then(() => dispatch(login(email, password, true)))
    console.log('test')
    return Promise.resolve(dispatch(receiveAccountCustomContent({
        user: 'jvoll',
        firstName: 'jason',
        lastName: 'voll'
    })))
}
