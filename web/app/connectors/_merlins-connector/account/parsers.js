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


const getProductID = ($editLink) => {
    const productIdMatch = /product_id\/(\d+)\//.exec($editLink.attr('href'))

    return productIdMatch ? productIdMatch[1] : ''
}

export const parseWishlistProducts = ($, $response) => {
    const products = {}
    const wishlistItems = []
    const productsFormInfo = {}

    $response.find('#wishlist-view-form .product-item').each((_, productTile) => {
        const $productTile = $(productTile)
        const productId = getProductID($productTile.find('.edit'))
        const itemId = $productTile.attr('id').replace('item_', '')
        const $photo = $productTile.find('.product-item-photo')
        const removeButtonData = JSON.parse($productTile.find('.btn-remove').attr('data-post-remove'))

        products[productId] = {
            price: $productTile.find('.price-box .price').text(),
            href: $photo.attr('href'),
            thumbnail: parseImage($photo.find('img')),
            title: $productTile.find('.product-item-name').text(),
            id: productId,
            available: !$productTile.find('.unavailable').length
        }
        if (removeButtonData) {
            productsFormInfo[productId] = {
                uenc: removeButtonData.data.uenc
            }
        }

        wishlistItems.push({
            quantity: parseInt($productTile.find('input.qty').val()),
            productId,
            itemId
        })
    })

    return {
        products,
        wishlistItems,
        productsFormInfo
    }
}
