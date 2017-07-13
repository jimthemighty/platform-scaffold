/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {parseImage} from '../../../utils/parser-utils'

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length

export const parseWishlistProducts = ($, $response) => {
    const products = {}

    $response.find('#wishlist-view-form .product-item').each((_, productTile) => {
        const $productTile = $(productTile)
        const $priceBox = $productTile.find('.price-box')
        const id = $priceBox.attr('data-product-id')
        const $photo = $productTile.find('.product-item-photo')

        products[id] = {
            price: $priceBox.find('.price').text(),
            href: $photo.attr('href'),
            thumbnail: parseImage($photo.find('img')),
            title: $productTile.find('.product-item-name').text(),
            id
        }
    })

    return products
}
