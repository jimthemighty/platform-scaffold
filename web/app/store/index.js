/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Immutable from 'immutable'

import uiReducer from '../containers/reducers'
import userReducer from './user/reducer'
import cartReducer from './cart/reducer'
import categoryReducer from './categories/reducer'
import modalReducer from 'progressive-web-sdk/dist/store/modals/reducer'
import notificationsReducer from 'progressive-web-sdk/dist/store/notifications/reducer'
import pushMessagingReducer from 'progressive-web-sdk/dist/store/push-messaging/reducer'
import offlineReducer from 'progressive-web-sdk/dist/store/offline/reducer'
import productReducer from './products/reducer'
import checkoutReducer from './checkout/reducer'
import {reducer as imReducer} from '../integration-manager/reducer'
import {reducer as formReducer} from 'redux-form'

import analytics from 'redux-analytics'
import analyticsManager from 'progressive-web-sdk/dist/analytics/analytics-manager'

analyticsManager.init({
    projectSlug: AJS_SLUG,              // eslint-disable-line no-undef
    mobifyGAID: 'UA-53825302-1',
    ecommerceLibrary: 'ec',
    debug: DEBUG                        // eslint-disable-line no-undef
})

const configureStore = (initialState) => {
    const middlewares = [
        thunk,
        analytics(({type, payload}, state) => analyticsManager.distribute(type, payload, state))
    ]
    const reducer = combineReducers({
        categories: categoryReducer,
        cart: cartReducer,
        ui: uiReducer,
        user: userReducer,
        modals: modalReducer,
        notifications: notificationsReducer,
        products: productReducer,
        checkout: checkoutReducer,
        offline: offlineReducer,
        integrationManager: imReducer,
        form: formReducer,
        pushMessaging: pushMessagingReducer
    })

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
          ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              serialize: {
                  immutable: Immutable
              }
          })
          : compose

    const store = createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    )

    return store
}

export default configureStore
