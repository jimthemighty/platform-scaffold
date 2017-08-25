/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getCookieValue} from '../../utils/utils'
import {isLocalStorageAvailable} from 'progressive-web-sdk/dist/utils/utils'

/**
 * Formats a floating point string as money (eg. '95.7500' -> '$95.75')
 * @param {String} price
 * @param {Boolean} isDiscount
 */
export const formatMerlinsMoney = (price, isDiscount) => {
    let val = parseFloat(price)
    if (isNaN(val)) {
        val = 0
    }
    if (isDiscount) {
        return `-$${Math.abs(val).toFixed(2)}`
    }
    return `$${val.toFixed(2)}`
}

/**
 * Multiplies the given price by quantity
 * @param {string} price
 * @param {number} quantity
 * @example
 * // Returns $95.96
 * productSubtotal('$23.99', 4)
 */
export const productSubtotal = (price, quantity) => {
    // Note: this is naive to non-dollar currencies!
    const priceInCents = price.replace(/[$,. ]/g, '')
    const subtotal = (parseInt(priceInCents) * quantity) / 100
    return formatMerlinsMoney(subtotal)
}

/**
 * Converts an HTML text snippet into raw text.
 * @param {String} fragment
 * @example
 * ie. '<span class=\"price\">$14.00<\/span>' => '$14.00'
 */
export const textFromFragment = (fragment) => {
    const e = document.createElement('div')
    e.innerHTML = fragment
    return e.textContent.trim()
}

export const submitForm = (url, data, options) => {
    // The form_key is a session-level value. If there is
    // a form_key cookie, that trumps all!
    const formKey = getCookieValue('form_key')
    if (formKey) {
        data.form_key = formKey
    }

    return makeFormEncodedRequest(url, data, options)
}

/**
 * Converts the given thumbnail URL to a higher resolution format
 * @param {*string} src the URL to the higher resolution image
 */
export const getHighResImage = (src) => {
    return src ? src.replace(/thumbnail\/\d+x\d+/, 'small_image/240x300') : src
}


// Some of the endpoints don't work with fetch, getting a 400 error
// from the backend. This function wraps the jQuery ajax() function
// to make requests to these endpoints.
//
// It looks like the server may be looking for the header
// X-Requested-With: XMLHttpRequest, which is not present with fetch.
//
// Alternatively, we could have an issue with header case:
// http://stackoverflow.com/questions/34656412/fetch-sends-lower-case-header-keys
export const jqueryAjaxWrapper = (options) => {
    return new Promise((resolve, reject) => {
        window.Progressive.$.ajax({
            ...options,
            success: (responseData) => resolve(responseData),
            error: (xhr, status) => reject(status)
        })
    })
}

export const prepareEstimateAddress = (inputAddress = {}) => {
    const {
        countryId = 'US',
        regionId,
        region,
        postcode = null
    } = inputAddress

    const address = {
        country_id: countryId,
        postcode
    }

    if (region) {
        address.region = region
    } else if (regionId) {
        address.regionId = regionId
    } else {
        address.regionId = '0'
    }

    return address
}

export const getNameValue = (firstname, lastname) =>
      [firstname, lastname].filter((item) => item).join(' ')


export const parseAddress = (address) => {
    const [addressLine1, addressLine2] = address.street
    return {
        city: address.city,
        countryId: address.country_id,
        preferred: address.default_shipping,
        id: `${address.id}`,
        firstname: address.firstname,
        lastname: address.lastname,
        fullname: getNameValue(address.firstname, address.lastname),
        postcode: address.postcode,
        regionId: `${address.region.region_id}`,
        region: address.region.region,
        regionCode: address.region.region_code,
        addressLine1,
        addressLine2,
        telephone: address.telephone,
    }
}

export const setLoggedInStorage = ($, $response) => {
    const [fullname, email] = $response
        .find('.box-information .box-content p')
        .contents()
        .filter((_, item) => item.nodeType === Node.TEXT_NODE)
        .map((_, item) => item.textContent.trim())

    const isLoggingIn = !!fullname

    if (!isLoggingIn) {
        if (isLocalStorageAvailable()) {
            return localStorage.setItem('mage-cache-storage', '{}')
        }
        document.cookie = 'ls_mage-cache-storage={}; path=/; expires=;'
        return true
    }

    if (isLocalStorageAvailable()) {
        const mageStorage = localStorage.getItem('mage-cache-storage')
        const userInfo = mageStorage ? JSON.parse(mageStorage) : {}
        userInfo.customer = {fullname, email}
        localStorage.setItem('mage-cache-storage', JSON.stringify(userInfo))
    } else {
        const mageCookie = getCookieValue('ls_mage-cache-storage')
        const userInfo = mageCookie ? JSON.parse(decodeURIComponent(mageCookie)) : {}
        userInfo.customer = {fullname, email}
        const updatedCookie = `ls_mage-cache-storage=${encodeURIComponent(JSON.stringify(userInfo))}; path=/; expires=;`
        document.cookie = updatedCookie
    }
    return true
}
