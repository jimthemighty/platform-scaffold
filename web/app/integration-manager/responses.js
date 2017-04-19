import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

export const receiveHomeData = createAction('Receive Home Data')
export const receiveNavigationData = createAction('Receive Navigation Data')
export const receiveFooterData = createAction('Receive Footer Data')
export const receiveCategory = createAction('Receive Category Data')
export const setPageFetchError = createAction('Set page fetch error', ['fetchError'])
export const receiveAppData = createAction('Receive App Data')
export const setLoggedIn = createAction('Set Logged in flag', ['isLoggedIn'])
export const setNavigationAccountLink = createAction('Set Navigation Account Link Text')
export const setCheckoutShippingURL = createAction('Set Checkout Shipping URL', ['checkoutShippingURL'])
export const setCartURL = createAction('Set Cart URL', ['cartURL'])
export const receiveOrderConfirmationContents = createAction('Receive Order Confirmation Contents')
