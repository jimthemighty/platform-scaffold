/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getImageType, getImageSize} from '../config'
import {getProductHref} from '../products/utils'
import {parseThumbnail} from '../parsers'

export const parseCartProducts = ({entries = []}) =>
    entries.reduce((acc, entry) => {
        const {
            basePrice: {formattedValue: price} = {},
            product: {
                code: id,
                images,
                name: title}} = entry
        acc[id] = {
            available: true,
            full: false,
            href: getProductHref(id),
            id,
            price,
            title
        }
        const thumbnail = parseThumbnail(images.find((image) => image.imageType === getImageType('primary') && image.format === getImageSize('thumbnail')), name)
        if (thumbnail) {
            acc[id].thumbnail = thumbnail
        }
        return acc
    }, {})


export const parseCartContents = (cart) => {
    const {
        appliedVouchers = [],
        entries = [],
        subTotal: {formattedValue: subtotal = ''} = {},
        orderDiscounts: {formattedValue: discount = ''} = {},
        totalPriceWithTax: {formattedValue: orderTotal = ''} = {},
        totalTax: {formattedValue: taxes = '', value: hasTaxes = false} = {}} = cart
    const items = entries.map((entry) => {
        const {
            basePrice: {formattedValue: itemPrice} = {},
            entryNumber: id,
            product: {code: productId},
            quantity,
            totalPrice: {formattedValue: linePrice} = {}} = entry
        return {
            id: id.toString(),
            href: getProductHref(productId),
            itemPrice,
            linePrice,
            productId,
            quantity
        }
    })

    const cartContents = {
        items,
        orderTotal,
        subtotal
    }

    if (appliedVouchers.length) {
        const appliedVoucher = appliedVouchers[0]
        cartContents.discount = {
            label: appliedVoucher.voucherCode,
            code: appliedVoucher.code,
            amount: discount
        }
    }
    if (hasTaxes) {
        cartContents.taxes = taxes
    }

    return cartContents
}
