/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {receiveCategoryContents, receiveCategoryInformation, receiveCategorySortOptions} from '../../categories/results'
import {receiveProductListProductData} from '../../products/results'
import categoryProductsParser, {parseCategoryTitle, parseCategoryId, priceFilterParser, parseSortOptions} from './parser'
import {productListParser} from '../products/parsers'
import {getTextFrom} from '../../../utils/parser-utils'
import {getURLWithoutSearchKey} from '../../../utils/utils'
import {fetchPageData} from '../app/commands'

export const initProductListPage = (url) => (dispatch) => {
    // Merlins uses 'product_list_order' as URL search key
    url = url.replace('sort', 'product_list_order')

    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            const pathKey = urlToPathKey(url).replace('product_list_order', 'sort')
            const pathKeyWithoutSearchKey = getURLWithoutSearchKey(pathKey)

            const title = parseCategoryTitle($, $response)
            const searchTermMatch = title.match(/'(.*)'/)
            const sortOptions = parseSortOptions($, $response)
            if (sortOptions.length > 0) {
                dispatch(receiveCategorySortOptions(sortOptions, pathKeyWithoutSearchKey))
            }

            // Receive page contents
            dispatch(receiveProductListProductData(productListParser($, $response)))
            dispatch(receiveCategoryInformation(pathKey, {
                id: parseCategoryId($, $response) || pathKey,
                href: pathKey,
                parentId: null,
                filters: priceFilterParser($, $response),
                title,
                searchTerm: searchTermMatch ? searchTermMatch[0] : null,
                description: getTextFrom($response, '#text, .category-description')
            }))
            dispatch(receiveCategoryContents(pathKey, categoryProductsParser($, $response)))
        })
}
