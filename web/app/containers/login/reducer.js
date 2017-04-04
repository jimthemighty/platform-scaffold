import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveLoginPageData} from '../../integration-manager/login/responses'

const initialState = Immutable.fromJS({
    signinSection: {
        form: {
            href: '',
            fields: [{}, {}, {}],
        },
    },
    registerSection: {
        form: {
            href: '',
            sections: [{
                fields: [{}, {}, {}, {}],
            }, {
                fields: [{}, {}, {}],
            }]
        },
    }
})

export default handleActions({
    [receiveLoginPageData]: mergePayload
}, initialState)
