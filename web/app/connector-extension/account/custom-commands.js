import {receiveAccountCustomContent} from '../../integration-manager/account/results'

export const initAccountPage = (url, routeName) => (dispatch) => {
    return Promise.resolve(dispatch(receiveAccountCustomContent({
        user: 'jvoll',
        firstName: 'jason',
        lastName: 'voll'
    })))
}
