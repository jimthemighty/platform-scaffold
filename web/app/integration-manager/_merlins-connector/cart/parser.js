/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {textFromFragment, productSubtotal, getHighResImage, formatMerlinsMoney} from '../utils'

export const parseCartProducts = ({items}) => { /* Products */
    const products = items.map(({product_id, product_name, product_url, product_price, product_image}) => ({
        id: product_id,
        title: product_name,
        href: product_url,
        price: textFromFragment(product_price),
        thumbnail: {
            src: getHighResImage(product_image.src),
            alt: product_image.alt,
            size: { /* See getHighResImage which has size hard-coded */
                width: '240px',
                height: '300px'
            }
        },
        available: true
    }))

    const productMap = {}
    products.forEach((product) => {
        productMap[urlToPathKey(product.href)] = product
    })

    return productMap
}

export const parseCart = ({items, subtotal}) => /* Cart */ {
    return {
        items: items.map(({item_id, product_id, product_url, qty, product_price}) => ({
            id: item_id,
            productId: product_id,
            href: product_url,
            quantity: qty,
            itemPrice: textFromFragment(product_price),
            linePrice: productSubtotal(textFromFragment(product_price), qty),
            configureUrl: `/checkout/cart/configure/id/${item_id}/product_id/${product_id}/` // eslint-disable-line camelcase
        })),
        subtotal: textFromFragment(subtotal),
        orderTotal: textFromFragment(subtotal)
    }
}

export const parseCartTotals = ({
    coupon_code,
    tax_amount,
    discount_amount,
    shipping_amount,
    base_grand_total,
    subtotal,
    subtotal_incl_tax
}) => {

    // We need the grand total if there's a discount or non-free shipping.
    /* eslint-disable camelcase */
    const orderTotal = (discount_amount || shipping_amount > 0)
          ? base_grand_total
          : subtotal_incl_tax
    /* eslint-enable camelcase */
    return {
        subtotal: formatMerlinsMoney(subtotal),
        tax: formatMerlinsMoney(tax_amount),
        orderTotal: formatMerlinsMoney(orderTotal)
    }
}
