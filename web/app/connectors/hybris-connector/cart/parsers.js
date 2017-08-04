/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getProductHref} from '../parsers'

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
            id,
            href: getProductHref(id),
            price,
            title
        }
        // TODO: Move 'PRIMARY' and 'thumbnail' TO CONFIG
        const imageSrc = (images || [])
            .find((image) => image.imageType === 'PRIMARY' && image.format === 'thumbnail')
        if (imageSrc) {
            acc[id].thumbnail = {
                src: imageSrc,
                alt: title
            }
        }
        return acc
    }, {})


export const parseCartContents = (cart) => {
    const {
        entries = [],
        subTotal: {formattedValue: subtotal} = {},
        totalDiscounts: {formattedValue: discount, value: hasDiscount} = {},
        totalPriceWithTax: {formattedValue: orderTotal} = {},
        totalTax: {formattedValue: taxes, value: hasTaxes} = {}} = cart
    const items = entries.map((entry) => {
        const {
            basePrice: {formattedValue: itemPrice} = {},
            entryNumber: id,
            product: {code: productId},
            quantity,
            totalPrice: {formattedValue: linePrice} = {}} = entry
        return {
            id,
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

    if (hasDiscount) {
        cartContents.discount = discount
    }
    if (hasTaxes) {
        cartContents.taxes = taxes
    }

    return cartContents
}
