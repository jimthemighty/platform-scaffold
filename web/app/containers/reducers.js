/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// THIS IS A GENERATED FILE, DO NOT EDIT

import {combineReducers} from 'redux'

import navigation from '../modals/navigation/reducer' // navigation is a special case, since it's not in the containers directory
import accountDashboard from './account-dashboard/reducer'
import accountInfo from './account-info/reducer'

import app from './app/reducer'
import cart from './cart/reducer'
import checkoutConfirmation from './checkout-confirmation/reducer'
import checkoutPayment from './checkout-payment/reducer'
import checkoutShipping from './checkout-shipping/reducer'
import footer from './footer/reducer'
import header from './header/reducer'
import home from './home/reducer'
import login from './login/reducer'
import productDetails from './product-details/reducer'
import productList from './product-list/reducer'


const uiReducer = combineReducers({
    navigation,
    accountDashboard,
    accountInfo,
    app,
    cart,
    checkoutConfirmation,
    checkoutPayment,
    checkoutShipping,
    footer,
    header,
    home,
    login,
    productDetails,
    productList,

})

export default uiReducer
