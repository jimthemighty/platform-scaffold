/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {parseImage, getTextFrom} from '../../../utils/parser-utils'
import {splitFullName} from '../../../utils/utils'

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

const getOrderNumber = ($pageTitle) => {
    const orderIdMatch = /#\s*(\d+)$/.exec($pageTitle.text())

    return orderIdMatch ? orderIdMatch[1] : ''
}

const parseAddress = ($addressBlock) => {
    const addressLines = $addressBlock.html().split('<br>')
    const addressLength = addressLines.length
    const containsAddressLine2 = addressLength === 6
    const {firstname, lastname} = splitFullName(addressLines[0])
    const [city, state, postcode] = addressLines[addressLength - 3].split(',')

    return {
        firstname,
        lastname,
        addressLine1: addressLines[1].trim(),
        addressLine2: containsAddressLine2 ? addressLines[2].trim() : '',
        city: city.trim(),
        region: state.trim(),
        postcode: postcode.trim(),
        country: addressLines[addressLength - 2].trim(),
        telephone: addressLines[addressLength - 1].replace(/T:\s*/, '').trim()
    }
}

const parseOption = ($option) => {
    return {
        label: $option.text(),
        value: $option.next('dd').text()
    }
}

export const parseOrder = ($, $response) => {
    return {
        orderNumber: getOrderNumber($response.find('.page-title')),
        date: getTextFrom($response, '.order-date date'),
        status: getTextFrom($response, '.order-status'),
        total: getTextFrom($response, '.grand_total .price'),
        tax: getTextFrom($response, '.totals-tax .price'),
        shippingTotal: getTextFrom($response, '.shipping .price'),
        subtotal: getTextFrom($response, 'tfoot .subtotal .price'),
        paymentMethods: [getTextFrom($response, '.box-order-billing-method .box-content')],
        shippingMethod: getTextFrom($response, '.box-order-shipping-method .box-content'),
        shippingAddress: parseAddress($response.find('.box-order-shipping-address address')),
        billingAddress: parseAddress($response.find('.box-order-billing-address address')),
        items: $response.find('.table-order-items tbody')
            .children()
            .get()
            .map((itemRow) => {
                const $itemRow = $(itemRow)

                return {
                    price: getTextFrom($itemRow, '.subtotal .price'),
                    quantity: getTextFrom($itemRow, '.items-qty .content'),
                    itemName: getTextFrom($itemRow, '.product-item-name'),
                    options: $itemRow.find('.item-options dt')
                        .get()
                        .map((option) => parseOption($(option)))
                }
            })
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
                id: JSON.parse($item.find('.action.order').attr('data-post')).action.match(/order_id\/(\d+)/)[1],
                viewHref: $item.find('.view').attr('href')
            }
        })
    return ordersMap
}
