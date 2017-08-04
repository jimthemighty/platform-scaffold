/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {parseImage, getTextFrom} from '../../../utils/parser-utils'

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length

export const parseAccountInfo = ($, $html) => {
    const $mainContent = $html.find('.page-main')
    const firstName = $mainContent.find('#firstname').val()
    const lastName = $mainContent.find('#lastname').val()
    const email = $mainContent.find('#email').val()

    return {
        title: getTextFrom($mainContent, '.page-title > span'),
        names: `${firstName} ${lastName}`,
        email
    }
}

export const parseWishlistProducts = ($, $response) => {
    const products = {}
    const wishlistItems = []

    $response.find('#wishlist-view-form .product-item').each((_, productTile) => {
        const $productTile = $(productTile)
        const id = $productTile.attr('id').replace('item_', '')
        const $photo = $productTile.find('.product-item-photo')

        products[id] = {
            price: $productTile.find('.price-box .price').text(),
            href: $photo.attr('href'),
            thumbnail: parseImage($photo.find('img')),
            title: $productTile.find('.product-item-name').text(),
            id,
            available: !$productTile.find('.unavailable').length
        }

        wishlistItems.push({
            quantity: parseInt($productTile.find('input.qty').val()),
            id
        })
    })

    return {
        products,
        wishlistItems
    }
}

export const parseAccountLocations = (magentoResponse, $, $response) => {
    const hasRegionDropdown = magentoResponse.getIn(['#country', 'regionUpdater', 'regionJson'])
    const optionalZipList = magentoResponse.getIn(['#country', 'regionUpdater', 'countriesWithOptionalZip'])
    const regionRequiredMap = {}
    const postCodeOptionalMap = {}

    optionalZipList.toJS().forEach((countryId) => {
        postCodeOptionalMap[countryId] = true
    })

    const regions = []
    hasRegionDropdown.toJS().config.regions_required.forEach((country) => {
        const countryRegions = hasRegionDropdown.toJS()[country]
        regionRequiredMap[country] = true

        Object.keys(countryRegions).forEach((region) => {
            regions.push({
                countryId: country,
                id: region,
                label: countryRegions[region].name
            })
        })
    })

    const countries = []

    $response.find('select#country option').each((_, option) => {
        const $option = $(option)
        const id = $option.val()

        countries.push({
            id,
            label: $option.text(),
            regionRequired: regionRequiredMap[id] || false,
            postcodeRequired: postCodeOptionalMap[id] || false
        })
    })

    return {
        countries,
        regions
    }
}
