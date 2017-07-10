/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {
    ACCOUNT_LINK,
    SIGNED_OUT_ACCOUNT_LINK,
    GUEST_NAV,
    LOGGED_IN_NAV
} from '../../../modals/navigation/constants'

import {
    MY_ACCOUNT_URL,
    WISHLIST_URL,
    SIGN_IN_URL
} from '../config'


export const parseNavigation = ($, $content, isLoggedIn) => {
    const root = {title: 'Root', path: '/', children: []}

    const $navListItems = $content.find('#store\\.menu nav.navigation li')
    let path = root.path
    $navListItems.each((idx, item) => {
        const $item = $(item)
        const $link = ($item
            .find('a')
            .first()
        )
        root.children.push({
            title: $link.text().trim(),
            path: $link.attr('href'),
            isCategoryLink: true,
            icon: 'lock'
        })
        if ($item.hasClass('active')) {
            path = $link.attr('href')
        }
    })

    root.children = root.children.concat(
        [
            {
                type: isLoggedIn ? ACCOUNT_LINK : SIGNED_OUT_ACCOUNT_LINK,
                title: 'My Account',
                options: {
                    icon: 'user',
                    className: 'u-margin-top-md u-border-top'
                },
                path: MY_ACCOUNT_URL
            },
            {
                type: isLoggedIn ? ACCOUNT_LINK : SIGNED_OUT_ACCOUNT_LINK,
                title: 'Wishlist',
                options: {
                    icon: 'star'
                },
                path: WISHLIST_URL
            },
            {
                ...(isLoggedIn ? LOGGED_IN_NAV : GUEST_NAV),
                options: {
                    icon: isLoggedIn ? 'lock' : 'user',
                    className: !isLoggedIn ? 'u-margin-top-md u-border-top' : ''
                },
                path: SIGN_IN_URL
            }
        ])

    return {root, path}
}
