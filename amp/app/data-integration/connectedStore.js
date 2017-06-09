import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {fromJS} from 'immutable'

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

import captureDisable from './capturejs-disable'
import {PAGE_TITLE, DATA_INIT_FUNCTION} from './constants'

export const createConnectedStore = (window, fullUrl, dataInitFunction) => {
    // This is okay to pass to both SFCC and Merlin's connectors,
    // as Merlin's doesn't need a configuration object
    registerConnector(Connector({
        siteID: '2017refresh',
        clientID: '5640cc6b-f5e9-466e-9134-9853e9f9db93'
    }))

    global.window = window
    global.Capture = {disable: (...args) => captureDisable(...args)}

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
        [PAGE_TITLE]: 'Merlins AMP', // Fetch the page again and get title?
        [DATA_INIT_FUNCTION]: dataInitFunction
    })}})

    return createStore(reducer, initialState, compose(applyMiddleware(...middlewares), noop))
}
