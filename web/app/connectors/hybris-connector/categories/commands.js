/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {receiveCategoryContents, receiveCategoryInformation, receiveCategorySortOptions} from 'progressive-web-sdk/dist/integration-manager/categories/results'
import {receiveProductListProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {getCategoryEndPoint, getSearchEndPoint} from '../config'
import {parseProductListData, parseCategoryData, parseSortOptions} from './parsers'
import {extractLastPartOfURL, getQueryStringValue, makeApiRequest} from '../utils'
import {PATHS} from '../constants'

const fetchCategoryInfo = (catId) => {
    if (catId) {
        const categoryInfoEndpoint = getCategoryEndPoint(catId)
        return makeApiRequest(categoryInfoEndpoint, {method: 'GET'})
            .then((response) => {
                if (response.status === 400) {
                    return Promise.reject()
                } else {
                    return response.json()
                }
            })
    }
    return Promise.resolve()
}

/**
 * @param {string} path - category path
 * @example "/cat/clothes/tshirts/270100"
 *
 * @param {string} catId - category id
 * @example "270100"
 *
 * @return {string} - path of parent category
 * @example "/cat/clothes/tshirts"
 */
const getParentCategoryPath = (path, catId) => {
    if (!path || !catId) {
        return null
    }

    const index = path.indexOf(`/${catId}`)
    const catPath = path.slice(0, index)

    if (catPath === `/${PATHS.CATEGORY}`) {
        return null
    }

    return catPath
}

/**
 * @param {string} path - category path
 * @example "/cat/clothes"
 *
 */
const getParentCategoryInfo = (catPath) => (dispatch) => {
    if (!catPath) {
        return null
    }

    const catId = extractLastPartOfURL(catPath)
    const parentCategoryPath = getParentCategoryPath(catPath, catId)

    if (parentCategoryPath) {
        dispatch(getParentCategoryInfo(parentCategoryPath))
    }

    return fetchCategoryInfo(catId)
        .then((response) => response)
        .then((response) => {
            const catName = response.name
            dispatch(receiveCategoryInformation(catPath, {
                id: catPath,
                title: catName,
                href: catPath,
                parentId: parentCategoryPath
            }))
        })
}

export const initProductListPage = (url, routeName) => (dispatch) => {
    let categoryName
    const categoryId = extractLastPartOfURL(url)
    const pageInQueryString = getQueryStringValue('p')
    const page = pageInQueryString ? (pageInQueryString - 1) : 0
    const sortOption = getQueryStringValue('sort') || 'relevance'
    const searchEndpoint = getSearchEndPoint(categoryId, page, sortOption)

    if (categoryId) {
        return fetchCategoryInfo(categoryId)
            .then((response) => {
                categoryName = response.name || ''
                return Promise.resolve()
            })
            .then(() => makeApiRequest(searchEndpoint, {method: 'GET'}))
            .then((response) => {
                if (response.status === 400) {
                    return Promise.reject()
                } else {
                    return response.json()
                }
            })
            .then((responseJSON) => {
                const pathKey = urlToPathKey(url)
                const productListData = parseProductListData(responseJSON)
                const categoryData = parseCategoryData(responseJSON)
                const parentCategoryPath = getParentCategoryPath(pathKey, categoryId)

                // Receive page contents
                dispatch(receiveProductListProductData(productListData))
                dispatch(receiveCategoryContents(pathKey, categoryData))
                dispatch(receiveCategoryInformation(pathKey, {
                    id: pathKey,
                    href: pathKey,
                    parentId: parentCategoryPath,
                    title: categoryName
                }))

                // Receive category hierarchy
                dispatch(getParentCategoryInfo(parentCategoryPath))

                // Receive sorting options
                const sortOptions = parseSortOptions(responseJSON)
                if (sortOptions.length > 0) {
                    dispatch(receiveCategorySortOptions(pathKey, sortOptions))
                }
            })
    }
    return Promise.resolve()
}
