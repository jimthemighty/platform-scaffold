/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const SIGN_IN_LINK_TEXT = 'Sign In'
export const SIGN_OUT_LINK_TEXT = 'Sign Out'

export const SIGNED_IN_LOGOUT_ITEM = 'AccountLogoutNavItem'

export const SIGNED_OUT_NAV_ITEM_TYPE = 'AccountNavItem'
export const HIDDEN_SIGNED_OUT_NAV_ITEM_TYPE = 'HiddenAccountItem'


export const LOGGED_IN_NAV = {
    type: SIGNED_IN_LOGOUT_ITEM,
    title: SIGN_OUT_LINK_TEXT
}

export const GUEST_NAV = {
    type: SIGNED_OUT_NAV_ITEM_TYPE,
    title: SIGN_IN_LINK_TEXT
}
