/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getProductHref} from '../parsers'
import {formatPrice} from '../../../utils/utils'

/* eslint-disable camelcase */
export const parseCartContents = ({
    product_items = [],
    product_total,
    product_sub_total,
    merchandize_total_tax,
    order_total,
    order_price_adjustments = [],
    coupon_items = []
}) => { /* Cart */
    const items = product_items.map(({item_id, product_id, price_after_order_discount, quantity}) => ({
        id: item_id,
        productId: product_id,
        quantity,
        href: getProductHref(product_id),
        // This is a "made up" URL scheme that matches Magento/Merlins right now
        // so that we can use the same route. SFCC doesn't seem to have the same
        // concept. See router.jsx
        configureUrl: `/checkout/cart/configure/id/${item_id}/product_id/${product_id}/`,
        itemPrice: `${formatPrice(price_after_order_discount / quantity)}`,
        linePrice: `${formatPrice(price_after_order_discount)}`
    }))

    const discounts = order_price_adjustments.map(({coupon_code = '', item_text, price}) => {
        coupon_items.find(({code}) => code === coupon_code)
        return {
            couponCode: coupon_code,
            text: item_text,
            amount: formatPrice(price),
            id: coupon_items.find(({code}) => code === coupon_code).coupon_item_id
        }
    })

    return {
        items,
        subtotal: formatPrice(product_sub_total),
        taxes: {
            label: 'Tax',
            amount: formatPrice(merchandize_total_tax)
        },
        discounts,
        /* TODO: shipping: undefined, */
        // order_total isn't provided by SFCC until many details have
        // been provided so we fall back to product_sub_total when its missing

        // Here we use product_total instead of product_sub_total because
        // product_sub_total doesn't take discounts into account
        orderTotal: formatPrice(order_total || product_total)
    }
}
/* eslint-enable camelcase */

/* eslint-disable camelcase */
export const parseCartProducts = ({product_items = []}) => { /* Products */
    const productMap = {}

    product_items.forEach(({product_id, product_name, price, item_text, quantity}) => {
        productMap[product_id] = {
            id: product_id,
            title: product_name,
            price: formatPrice(price / quantity),
            href: getProductHref(product_id),
            description: item_text,
            available: true
        }
    })
    return productMap
}
/* eslint-enable camelcase */
