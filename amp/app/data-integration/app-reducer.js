import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {mergePayload} from '../../../web/app/utils/reducer-utils'

import {setCurrentURL} from '../../../web/app/integration-manager/results'
import {CURRENT_URL} from '../../../web/app/containers/app/constants'

export const initialState = fromJS({
    [CURRENT_URL]: ''
})

export default handleActions({
    [setCurrentURL]: mergePayload,
}, initialState)
