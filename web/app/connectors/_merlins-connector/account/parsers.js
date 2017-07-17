/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length

export const accountAddressParser = ($, $html) => {
    return {
        defaultAddress: $html.find('.block-addresses-default'),
        addresses: $html.find('address').map((_, address) => {
            const $address = $(address)
            const text = $address
                .contents()
                .filter((_, item) => item.nodeType !== 1)
                .map((_, textNode) => textNode.textContent)

            const firstname = text[0] ? text[0].split(' ')[0] : ''
            const lastname = text[0] ? text[0].split(' ')[1] : ''
            const postcode = text[2].split(',')[2] ? text[2].split(',')[2] : ''
            const regionId = text[2].split(',')[1] ? text[2].split(',')[1].trim() : ''

            return {
                firstname,
                lastname,
                addressLine1: text[1].trim(),
                city: text[2].split(',')[0].trim(),
                countryId: text[3].trim(),
                postcode,
                telephone: text[4].trim(),
                // addressLine2: 'Text',
                // We expect one of these two "region" fields to be non-null
                regionId,
                // region: 'Text'
            }
        })
    }
}
