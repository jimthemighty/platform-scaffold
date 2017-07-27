/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getCookieValue} from '../../../utils/utils'
import {
    receiveWishlistData,
    receiveWishlistUIData
} from 'progressive-web-sdk/dist/integration-manager/account/results'
import {receiveWishlistProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {parseWishlistProducts} from './parsers'
import {receiveFormInfo} from '../actions'

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

export const buildFormData = (formValues) => {
    const formData = new FormData()

    Object.keys(formValues).forEach((key) => {
        const item = formValues[key]
        if (key === 'street') {
            // Street must be converted away from an array, and into a
            // series of `street[]` keys-value pairs. This is what the
            // Magento backend uses to fill out multiple street
            // address fields
            for (let i = 0; i < item.length; i++) {
                formData.append('street[]', item[i])
            }
        } else {
            formData.append(key, item)
        }
    })

    formData.append('form_key', getCookieValue('form_key'))

    return formData
}

export const createAddressRequestObject = (formValues) => {
    const {
        firstname,
        lastname,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        region,
        postcode,
        telephone
    } = formValues

    return {
        firstname,
        lastname,
        company: company || '',
        telephone: telephone ? telephone.replace(/[()\- ]/g, '') : '',
        postcode,
        city,
        street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1, ''],
        region_id: regionId,
        region: region || '',
        country_id: countryId,
    }
}

export const receiveWishlistResponse = ($, $response) => (dispatch) => {
    const {
        wishlistItems,
        products,
        productsFormInfo
    } = parseWishlistProducts($, $response)
    const formURL = $response.find('#wishlist-view-form').attr('action')
    const wishlistData = {
        title: $response.find('.page-title').text(),
        products: wishlistItems,
        shareURL: formURL ? formURL.replace('update', 'share') : ''
    }
    dispatch(receiveWishlistProductData(products))
    dispatch(receiveWishlistData(wishlistData))
    dispatch(receiveWishlistUIData({contentLoaded: true}))
    dispatch(receiveFormInfo(productsFormInfo))
}

export const fetchCustomerAddresses = () => {
    const fetchURL = `/rest/default/V1/carts/mine`
    return makeRequest(fetchURL, {method: 'GET'})
        .then((response) => response.json())
}
