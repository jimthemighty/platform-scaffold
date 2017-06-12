import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {waitForResolves} from 'react-redux-resolve'
import thunk from 'redux-thunk'
import {fromJS} from 'immutable'
import Promise from 'bluebird'
import _jsdom from 'jsdom'

// DO NOT USE! Merlins Connector is an example connector that is for demo only
import {Connector} from '../../../web/app/integration-manager/_merlins-connector'
// import {Connector} from './integration-manager/_sfcc-connector'

import {registerConnector} from '../../../web/app/integration-manager'
import {reducer as imReducer} from '../../../web/app/integration-manager/reducer'
import {CURRENT_URL} from '../../../web/app/containers/app/constants'

import appReducer from '../../../web/app/containers/app/reducer'
import footerReducer from '../../../web/app/containers/footer/reducer'
import headerReducer from '../../../web/app/containers/header/reducer'
import homeReducer from '../../../web/app/containers/home/reducer'
import navigationReducer from '../../../web/app/containers/navigation/reducer'
import productDetailsReducer from '../../../web/app/containers/product-details/reducer'
import productListReducer from '../../../web/app/containers/product-list/reducer'
import categoryReducer from '../../../web/app/store/categories/reducer'
import productReducer from '../../../web/app/store/products/reducer'

import {jqueryResponse} from './capturejs'
import {PAGE_TITLE} from './constants'

const jsdom = Promise.promisifyAll(_jsdom)

export const jsdomEnv = () => jsdom.envAsync('', ['http://code.jquery.com/jquery.js']) // TODO: Use local copy

export const initializeStore = (fullUrl, container) => {
    return jsdomEnv().then((window) => {
        registerConnector(Connector({
            jqueryResponse: jqueryResponse(window)
        }))

        const uiReducer = combineReducers({
            app: appReducer,
            footer: footerReducer,
            header: headerReducer,
            home: homeReducer,
            navigation: navigationReducer,
            productDetails: productDetailsReducer,
            productList: productListReducer
        })

        const reducer = combineReducers({
            categories: categoryReducer,
            ui: uiReducer,
            products: productReducer,
            integrationManager: imReducer,
        })

        const middlewares = [
            thunk,
        ]

        const noop = (f) => f

        const initialState = ({ui: {app: fromJS({
            [CURRENT_URL]: fullUrl,
            [PAGE_TITLE]: 'Merlins AMP' // Fetch the page again and get title?
        })}})

        const createdStore = createStore(reducer, initialState, compose(applyMiddleware(...middlewares), noop))

        const renderProps = {
            location: {},
            components: [container],
            history: {}
        }

        return waitForResolves(renderProps, createdStore)
        .then(() => {
            return createdStore
        })
    })
}
