import {receiveUserCustomContent} from 'progressive-web-sdk/dist/integration-manager/results'
import {getAuthTokenPayload, makeApiRequest} from '../../connectors/_sfcc-connector/utils'

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
            return dispatch(receiveUserCustomContent({
                user: responseJSON.email,
                firstName: responseJSON.first_name,
                lastName: responseJSON.last_name
            }))

        })
}
