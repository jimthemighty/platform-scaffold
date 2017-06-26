import {receiveAccountCustomContent} from '../../integration-manager/account/results'
import {getAuthTokenPayload, makeApiRequest} from '../../integration-manager/_sfcc-connector/utils'

export const initAccountPage = () => (dispatch) => {
    const {sub} = getAuthTokenPayload()
    const customerID = JSON.parse(sub).customer_info.customer_id

    console.log('init account page')
    return makeApiRequest(`/customers/${customerID}`, {method: 'GET'})
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.fault) {
                console.error('Ruh roh!', responseJSON.fault)
            }
            return dispatch(receiveAccountCustomContent({
                user: responseJSON.email,
                firstName: responseJSON.first_name,
                lastName: responseJSON.last_name
            }))

        })
}
