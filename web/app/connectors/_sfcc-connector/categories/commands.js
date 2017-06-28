/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey, getURLWithoutQuery} from 'progressive-web-sdk/dist/utils/utils'
import {makeApiRequest} from '../utils'
import {
    receiveCategoryContents,
    receiveCategoryInformation,
    receiveCategorySortOptions
} from 'progressive-web-sdk/dist/integration-manager/categories/results'
import {receiveProductListProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {parseProductListData, parseSortedProductKeys} from '../parsers'
import {getCategoryPath, SEARCH_URL} from '../config'
import {ITEMS_PER_PAGE} from '../../../containers/product-list/constants'

const makeCategoryURL = (id) => `/categories/${id}`
const makeCategorySearchURL = (id, query = '', start, sortQuery) => `/product_search?expand=availability,images,prices&q=${query}&refine_1=cgid=${id}&count=${ITEMS_PER_PAGE}&start=${start}${sortQuery}`


/* eslint-disable camelcase, no-use-before-define */
const processCategory = (dispatch) => ({parent_category_id, id, name}) => {
    const parentId = parent_category_id !== 'root' ? parent_category_id : null
    const path = getCategoryPath(id)

    dispatch(receiveCategoryInformation(id, {
        id,
        title: name,
        href: path,
        parentId
    }))

    if (parentId) {
        dispatch(fetchCategoryInfo(parentId))
    }
}
/* eslint-enable camelcase, no-use-before-define */

const buildSearchTerm = (query) => query.replace(/\+/g, ' ').trim()

const fetchCategoryInfo = (id) => (dispatch) => {
    if (id) {
        return makeApiRequest(makeCategoryURL(id), {method: 'GET'})
            .then((response) => response.json())
            .then(processCategory(dispatch))
    }
    return Promise.resolve()
}

const extractCategoryId = (url) => {
    const pathKeyMatch = /\/([^/]+)$/.exec(url)
    const categoryIDMatch = pathKeyMatch ? pathKeyMatch[1].match(/([^?]*)|([^?]*)\?.*/) : ''
    return categoryIDMatch ? categoryIDMatch[1] : ''
}

const extractPageNumber = (url) => {
    const pageMatch = url.match(/p=(.*)/)
    return pageMatch ? pageMatch[1] : '1'
}

const extractSortOption = (url) => {
    const sortOption = url.match(/sort=(.*)/)
    return sortOption ? sortOption[1] : ''
}

export const initProductListPage = (url) => (dispatch) => {

    const path = urlToPathKey(url)
    const categoryID = extractCategoryId(url)
    const start = (parseInt(extractPageNumber(url)) - 1) * ITEMS_PER_PAGE
    const sort = extractSortOption(url)
    const sortQuery = sort ? `&sort=${sort}` : ''

    let searchUrl
    const isSearch = path.includes(SEARCH_URL)

    if (isSearch) {
        const searchQueryMatch = path.match(/\?q=\+(.*)/)
        const searchQuery = searchQueryMatch ? searchQueryMatch[1] : ''
        const searchTerm = buildSearchTerm(searchQuery)

        searchUrl = makeCategorySearchURL('', encodeURIComponent(searchQuery).replace(/%2B/g, '+'))

        dispatch(receiveCategoryInformation(path, {
            id: searchQuery,
            href: path,
            searchTerm,
            title: `Search results for ${searchTerm}`,
            parentId: null
        }))
    } else {
        searchUrl = makeCategorySearchURL(categoryID, start, sortQuery)
    }

    return dispatch(fetchCategoryInfo(isSearch ? null : categoryID))
        .then(() => makeApiRequest(searchUrl, {method: 'GET'}))
        .then((response) => response.json())
        .then((response) => {
            const {total, hits, sorting_options} = response

            const pathKey = urlToPathKey(url).replace('product_list_order', 'sort')
            const pathKeyWithoutQuery = getURLWithoutQuery(pathKey)

            if (sorting_options.length > 0) {
                dispatch(receiveCategorySortOptions(sorting_options, pathKeyWithoutQuery))
            }

            if (total === 0) {
                dispatch(receiveCategoryContents(urlToPathKey(url), {
                    products: [],
                    itemCount: total
                }))
                return
            }

            const productListData = parseProductListData(hits)
            const sortedProductKeys = parseSortedProductKeys(hits)

            dispatch(receiveProductListProductData(productListData))
            dispatch(receiveCategoryContents(urlToPathKey(url), {
                products: sortedProductKeys,
                itemCount: total
            }))
        })
}
