import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {waitForResolves} from 'react-redux-resolve'
import thunk from 'redux-thunk'
import {fromJS} from 'immutable'
import Promise from 'bluebird'
import _jsdom from 'jsdom'
import atob from 'atob'

// DO NOT USE! Merlins Connector is an example connector that is for demo only
// import {Connector} from '../../../web/app/connectors/_merlins-connector'
import {Connector} from '../../../web/app/connectors/_sfcc-connector'

import {registerConnector} from 'progressive-web-sdk/dist/integration-manager'
import {reducer as imReducer} from 'progressive-web-sdk/dist/integration-manager/reducer'
import {CURRENT_URL} from 'progressive-web-sdk/dist/store/app/constants'

import appReducer from './app-reducer'
import footerReducer from '../../../web/app/containers/footer/reducer'
import homeReducer from '../../../web/app/containers/home/reducer'
import navigationReducer from '../../../web/app/modals/navigation/reducer'
import productListReducer from '../../../web/app/containers/product-list/reducer'
import productDetailsReducer from './product-details-reducer'
import categoryReducer from '../../../web/app/store/categories/reducer'
import productReducer from 'progressive-web-sdk/dist/store/products/reducer'

import {jqueryResponse} from './capturejs'
import {PAGE_TITLE} from './constants'

const jsdom = Promise.promisifyAll(_jsdom)

const storage = {}

const setItemInStorage = (key, value) => {
    storage[key] = value
}

const getItemInStorage = (key) => {
    return storage[key]
}

const removeItemInStorage = (key) => {
    delete storage[key]
}

export const jsdomEnv = () => jsdom.envAsync('', ['http://code.jquery.com/jquery.js']) // TODO: Use local copy

export const initializeStore = (fullUrl, containers) => {
    return jsdomEnv().then((window) => {
        registerConnector(Connector({
            jqueryResponse: jqueryResponse(window),
            setItemInStorage,
            getItemInStorage,
            removeItemInStorage,
            siteBaseURL: 'https://mobify-tech-prtnr-na03-dw.demandware.net',
            siteID: '2017refresh',
            clientID: '5640cc6b-f5e9-466e-9134-9853e9f9db93',
            atob
        }))

        const uiReducer = combineReducers({
            footer: footerReducer,
            home: homeReducer,
            navigation: navigationReducer,
            productDetails: productDetailsReducer,
            productList: productListReducer
        })

        const reducer = combineReducers({
            app: appReducer,
            categories: categoryReducer,
            ui: uiReducer,
            products: productReducer,
            integrationManager: imReducer
        })

        const middlewares = [
            thunk,
        ]

        const noop = (f) => f

        const initialState = ({
            app: fromJS({
                [CURRENT_URL]: fullUrl,
                [PAGE_TITLE]: 'Merlins AMP' // Fetch the page again and get title?
            })
        })

        const createdStore = createStore(reducer, initialState, compose(applyMiddleware(...middlewares), noop))

        const renderProps = {
            location: {},
            components: containers,
            history: {}
        }

        return waitForResolves(renderProps, createdStore)
        .then(() => {
            return createdStore
        })
    })
}
