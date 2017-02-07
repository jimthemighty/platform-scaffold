import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import * as utils from '../../utils/utils'
import * as selectors from './selectors'

import Home from '../home/container'
import Login from '../login/container'
import PDP from '../pdp/container'
import PLP from '../plp/container'
import * as homeActions from '../home/actions'
import * as loginActions from '../login/actions'
import * as pdpActions from '../pdp/actions'
import * as footerActions from '../footer/actions'
import * as navigationActions from '../navigation/actions'
import * as productsActions from '../../store/products/actions'
import * as categoriesActions from '../../store/categories/actions'

export const addNotification = utils.createAction('Add Notification')
export const removeNotification = utils.createAction('Remove Notification')
export const removeAllNotifications = utils.createAction('Remove All Notifications')

/**
 * Action dispatched when the route changes
 * @param {string} pageComponent - the component of the entered route
 * @param {string} currentURL - what's currently shown in the address bar
 */
export const onRouteChanged = utils.createAction('On route changed', 'currentURL', 'pageComponent')

/**
 * Action dispatched when content for a global page render is ready.
 *
 * @param {object} $ - a selector library like jQuery
 * @param {object} $response - a jQuery-wrapped DOM object
 * @param {string} pageComponent - the component of the page received
 * @param {string} url - the URL of the page received
 * @param {string} currentURL - what's currently shown in the address bar
 */
export const onPageReceived = utils.createAction('On page received',
    '$',
    '$response',
    'url',
    'currentURL',
    'routeName'
)

export const setPageFetchError = utils.createAction('Set page fetch error', 'fetchError')
export const clearPageFetchError = utils.createAction('Clear page fetch error')

/**
 * Fetch the content for a 'global' page render. This should be driven
 * by react-router, ideally.
 */
export const fetchPage = (url, pageComponent, routeName) => {
    return (dispatch, getState) => {
        let isOffline = false

        return utils.makeRequest(url)
            .then((response) => {
                isOffline = response.headers.get('x-mobify-progressive') === 'offline'

                return response
            })
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res

                if (isOffline) {
                    dispatch(setPageFetchError('Failed to fetch, cached response provided'))
                } else {
                    dispatch(clearPageFetchError())
                }

                const currentURL = selectors.getCurrentUrl(getState())
                const receivedAction = onPageReceived($, $response, url, currentURL, routeName)

                // Let app-level reducers know about receiving the page
                dispatch(receivedAction)

                if (pageComponent === Home) {
                    dispatch(homeActions.process(receivedAction))
                } else if (pageComponent === Login) {
                    dispatch(loginActions.process(receivedAction))
                } else if (pageComponent === PDP) {
                    dispatch(pdpActions.process(receivedAction))
                    dispatch(productsActions.processPdp(receivedAction))
                } else if (pageComponent === PLP) {
                    dispatch(categoriesActions.process(receivedAction))
                    dispatch(productsActions.processPlp(receivedAction))
                }
                dispatch(footerActions.process(receivedAction))
                dispatch(navigationActions.process(receivedAction))
            })
            .catch((error) => {
                console.info(error.message)
                dispatch(setPageFetchError(error.message))
            })
    }
}
