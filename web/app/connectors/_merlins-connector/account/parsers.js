/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length

const parseAddressInfo = ($address) => {
    const text = $address
        .contents()
        .filter((_, item) => item.nodeType !== 1)
        .map((_, textNode) => textNode.textContent)

    const firstname = text[0].split(' ')[0]
    const lastname = text[0].split(' ')[1]
    const city = text[2].split(',')[0] ? text[2].split(',')[0].trim() : ''
    const regionId = text[2].split(',')[1] ? text[2].split(',')[1].trim() : ''
    const postcode = text[2].split(',')[2] ? text[2].split(',')[2].trim() : ''

    return {
        firstname,
        lastname,
        addressLine1: text[1].trim(),
        city,
        countryId: text[3].trim(),
        regionId,
        postcode,
        telephone: text[4].trim()
    }
}
export const accountAddressParser = ($, $html) => {
    return {
        defaultAddress: parseAddressInfo($html.find('.box-address-billing address')),
        addresses: $.makeArray($html.find('.block-addresses-list address').map((_, address) => {
            const $address = $(address)
            return parseAddressInfo($address)
        }))
    }
}
