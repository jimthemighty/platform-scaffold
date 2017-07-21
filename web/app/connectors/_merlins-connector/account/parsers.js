/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {parseImage} from '../../../utils/parser-utils'

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length

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
