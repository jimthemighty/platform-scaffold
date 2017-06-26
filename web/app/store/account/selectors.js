import Immutable from 'immutable'
import {getAccount} from '../../store/selectors'
import {createGetSelector} from 'reselect-immutable-helpers'

export const getAccountCustomContent = createGetSelector(getAccount, 'custom', Immutable.Map())
