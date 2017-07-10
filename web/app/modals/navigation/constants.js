/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const SIGN_IN_LINK_TEXT = 'Sign In'
export const SIGN_OUT_LINK_TEXT = 'Sign Out'



export const ACCOUNT_LINK = 'AccountNavItem'
export const SIGN_OUT_LINK = 'AccountLogoutNavItem'
export const SIGNED_OUT_ACCOUNT_LINK = 'HiddenAccountItem'


export const LOGGED_IN_NAV = {
    type: SIGN_OUT_LINK,
    title: SIGN_OUT_LINK_TEXT
}

export const GUEST_NAV = {
    type: ACCOUNT_LINK,
    title: SIGN_IN_LINK_TEXT
}
