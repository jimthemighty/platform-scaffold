/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {parseAddress} from '../utils'
import {getCookieValue} from '../../../utils/utils'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveAccountAddressData} from 'progressive-web-sdk/dist/integration-manager/account/results'

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
        preferred,
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
        region_id: regionId || '',
        default_billing: preferred ? '1' : '',
        default_shipping: preferred ? '1' : '',
        region: region || '',
        country_id: countryId,
    }
}

export const fetchCustomerAddresses = () => {
    const fetchURL = `/rest/default/V1/carts/mine`
    return makeRequest(fetchURL, {method: 'GET'})
        .then((response) => response.json())
}

export const updateCustomerAddresses = () => (dispatch) => {
    const fetchURL = `/rest/default/V1/carts/mine`
    return makeRequest(fetchURL, {method: 'GET'})
        .then((response) => response.json())
        .then(({customer: {addresses}}) => addresses.map((address) => parseAddress(address)))
        .then((addresses) => dispatch(receiveAccountAddressData(addresses)))
}
