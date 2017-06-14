/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {receiveCategoryContents, receiveCategoryInformation} from '../../categories/results'
import {receiveProductListProductData} from '../../products/results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {parseTextLink, parseImage, getTextFrom} from '../../../utils/parser-utils'

const productListParser = ($, $html) => {
    const $products = $html.find('.item.product-item')
    const productMap = {}
    $products.each((_, product) => {
        const $product = $(product)
        const link = parseTextLink($product.find('.product-item-link'))
        const thumbnail = parseImage($product.find('.product-image-photo'))
        const available = $product.find('.stock.unavailable').length === 0

        productMap[urlToPathKey(link.href)] = {
            id: $product.find('.price-box').length ? $product.find('.price-box').attr('data-product-id') : '',
            title: link.text,
            price: getTextFrom($product, '.price'),
            available,
            href: link.href,
            thumbnail,
            images: [thumbnail]
        }
    })
    return productMap
}

export const parseCategoryId = ($html) => {
    const className = $html.find('li[class*="category"]').attr('class')
    const classMatch = /category(\d+)/.exec(className)
    if (classMatch) {
        return classMatch[1]
    }
    return null
}

const parseCategoryData = ($html, pathKey) => {
    const title = $html.find('.page-title').text()
    const categoryId = parseCategoryId($html)

    return {
        id: categoryId || pathKey,
        href: pathKey,
        parentId: null,
        title,
        description: $html.find('#text').text()
    }
}

const categoryProductsParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()

    const products = $
          .makeArray($html.find('.item.product-item'))
          .map((product) => $(product).find('.product-item-link').attr('href'))
          .map(urlToPathKey)

    return {
        itemCount: $numItems.length > 0 ? parseInt($numItems.text(), 10) : 0,
        products
    }
}

export const initProductListPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initProductListPage stub')

    return makeRequest(url)
        .then(jqueryResponse)
        .then(([$, $response]) => {
            const pathKey = urlToPathKey(url)
            const categoryData = parseCategoryData($response, pathKey)
            const productListData = productListParser($, $response)

            dispatch(receiveCategoryInformation(pathKey, categoryData))
            dispatch(receiveProductListProductData(productListData))
            dispatch(receiveCategoryContents(pathKey, categoryProductsParser($, $response)))
        })
}
