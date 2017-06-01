import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getApp = createSelector(getUi, ({app}) => app)

// This will need to become more complicated when we handle more types of errors,
// but will do for now
export const getSvgSprite = createGetSelector(getApp, 'sprite')
