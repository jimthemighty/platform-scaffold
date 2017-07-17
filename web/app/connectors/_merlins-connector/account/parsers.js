/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length

export const accountAddressParser = ($, $html) => {
    return {
        default: $html.find('.block-addresses-default'),
        addresses: $html.find('address')
    }
}
