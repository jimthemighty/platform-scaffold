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

export const parseOrderListData = ($, $response) => {
    const ordersMap = {}
    $response
        .find('#my-orders-table tbody tr')
        .each((_, item) => {
            const $item = $(item)
            const orderNumber = $item.find('.id').text()
            ordersMap[orderNumber] = {
                orderNumber,
                date: $item.find('.date').text(),
                shipTo: $item.find('.shipping').text(),
                total: $item.find('.total .price').text(),
                status: $item.find('.status').text(),
                id: JSON.parse($item.find('.action.order').attr('data-post')).action.match(/order_id\/(\d+)/)[1]
            }
        })
    return ordersMap
}
