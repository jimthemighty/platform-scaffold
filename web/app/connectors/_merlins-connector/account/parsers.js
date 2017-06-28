/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getTextFrom} from '../../../utils/parser-utils'
import Immutable from 'immutable'

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length

export const parsedDashboard = ($, $html) => {
    const $mainContent = $html.find('.page-main')
    const test = {
        title: getTextFrom($mainContent, '.page-title > span'),
        links: $mainContent.find('.sidebar-main .nav.item:not(.current)').map((_, link) => {
            const $link = $(link)
            debugger
            return {
                text: $link.text(),
                href: $link.find('a').attr('href')
            }
        })
    }
    console.log('Immutable', Immutable)
    debugger
    debugger
    return Immutable.fromJS(test)
}
