/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getTextFrom} from '../../../utils/parser-utils'

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length

export const parseDashboard = ($, $html) => {
    const $mainContent = $html.find('.page-main')
    const linkArray = $.makeArray($mainContent.find('.sidebar-main .nav.item:not(.current)'))
    return {
        title: getTextFrom($mainContent, '.page-title > span'),
        links: linkArray.map((link) => {
            const $link = $(link)
            return {
                text: $link.text(),
                href: $link.find('a').attr('href')
            }
        })
    }
}
