import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {urlToPathKey} from '../../utils/utils'

import * as appActions from './actions'

import {receiveAppData, setPageFetchError} from '../../integration-manager/responses'
import {CURRENT_URL, FETCHED_PATHS} from './constants'

export const initialState = fromJS({
    [CURRENT_URL]: window.location.href,
    notifications: [],
    fetchError: null,
    [FETCHED_PATHS]: {},
    sprite: ''
})

export default handleActions({
    ...mergePayloadForActions(appActions.receiveData, receiveAppData, appActions.setPageFetchError, setPageFetchError),
    [appActions.onRouteChanged]: (state, {payload: {currentURL}}) => {
        return state.set(CURRENT_URL, currentURL)
    },
    // Remove this reducer once we've fully converted to the integration manager
    [appActions.onPageReceived]: (state, {payload: {url}}) => {
        const path = urlToPathKey(url)
        return state.setIn([FETCHED_PATHS, path], true)
    },
    [appActions.setFetchedPage]: (state, {payload: {url}}) => {
        const path = urlToPathKey(url)
        return state.setIn([FETCHED_PATHS, path], true)
    },
    [appActions.addNotification]: (state, {payload}) => {
        return state.update('notifications', (notifications) => {
            // Don't allow duplicate notifications to be added
            return notifications.every(({id}) => id !== payload.id) ? notifications.push(payload) : notifications
        })
    },
    [appActions.removeNotification]: (state, {payload}) => {
        return state.update('notifications', (notifications) => {
            return notifications.filterNot(({id}) => id === payload)
        })
    },
    [appActions.removeAllNotifications]: (state) => {
        return state.set('notifications', List())
    },
    [appActions.clearPageFetchError]: (state) => {
        return state.set('fetchError', null)
    },
    [appActions.updateSvgSprite]: (state, {payload}) => {
        return state.set('sprite', payload.sprite)
    }
}, initialState)
