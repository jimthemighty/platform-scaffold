/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */


import {getTextFrom} from '../../../utils/parser-utils'

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length

export const parseAccountInfo = ($, $html) => {
    const $mainContent = $html.find('.page-main')
    return {
        title: getTextFrom($mainContent, '.page-title > span'),
        accountFormInfo: $mainContent.find('form .info .field').map((_, field) => {
            const $field = $(field)
            return {
                title: $field.find('.legend span').text(),
                label: $field.find('.label').text(),
                name: $field.find('input').attr('name'),
                id: $field.find('input').attr('id'),
                value: $field.find('input').attr('value')
            }
        }),
        passwordFormInfo: $mainContent.find('form .password .field').map((_, field) => {
            const $field = $(field)
            return {
                title: $field.find('.legend span').text(),
                label: $field.find('.label').text(),
                name: $field.find('input').attr('name'),
                id: $field.find('input').attr('id'),
                value: $field.find('input').attr('value')
            }
        })
    }
}

