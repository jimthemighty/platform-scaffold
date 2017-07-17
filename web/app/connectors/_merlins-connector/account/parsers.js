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

            return {
                firstname: text[0].textContent.split(' ')[0],
                lastname: text[0].textContent.split(' ')[1],
                addressLine1: text[1].textContent.trim(),
                city: text[2].textContent.split(',')[0].trim(),
                countryId: text[3].textContent.trim(),
                postcode: text[2].textContent.split(',')[2].trim(),
                telephone: text[4].textContent.trim(),
                // addressLine2: 'Text',
                // We expect one of these two "region" fields to be non-null
                regionId: text[2].textContent.split(',')[1].trim(),
                // region: 'Text'
            }
        })
    }
}
