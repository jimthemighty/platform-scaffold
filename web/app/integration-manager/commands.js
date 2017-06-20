/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {register as registerHome} from 'progressive-web-sdk/dist/integration-manager/home/commands'
import {register as registerProducts} from 'progressive-web-sdk/dist/integration-manager/products/commands'
import {register as registerCategories} from 'progressive-web-sdk/dist/integration-manager/categories/commands'
import {register as registerCart} from 'progressive-web-sdk/dist/integration-manager/cart/commands'
import {register as registerApp} from 'progressive-web-sdk/dist/integration-manager/app/commands'
import {register as registerCheckout} from 'progressive-web-sdk/dist/integration-manager/checkout/commands'
import {register as registerAccount} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {register as registerCustomCommands} from 'progressive-web-sdk/dist/integration-manager/custom/commands'


let connector = {}

export const register = (commands) => {
    connector = commands
    registerApp(commands.app)
    registerHome(commands.home)
    registerProducts(commands.products)
    registerCategories(commands.categories)
    registerCart(commands.cart)
    registerCheckout(commands.checkout)
    registerAccount(commands.account)
}

export const registerCustom = (commands) => {
    registerCustomCommands(commands)
}

/** @function */
export const submitNewsletter = (...args) => connector.submitNewsletter(...args)

/** @function */
export const getSearchSuggestions = (...args) => connector.getSearchSuggestions(...args)
