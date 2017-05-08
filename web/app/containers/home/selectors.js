import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getHome = createSelector(getUi, ({home}) => home)

export const getHomeBanners = createGetSelector(getHome, 'banners')
export const getHomeCategories = createGetSelector(getHome, 'categories')
