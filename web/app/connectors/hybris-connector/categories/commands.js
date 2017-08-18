/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {receiveCategoryContents, receiveCategoryFilterOptions, receiveCategoryInformation, receiveCategorySortOptions} from 'progressive-web-sdk/dist/integration-manager/categories/results'
import {receiveProductListProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {urlToPathKey, urlToBasicPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {changeFilterTo} from '../../../store/categories/actions'
import {getCategoryEndPoint, getFreeTextSearchEndPoint, getSearchEndPoint, getSearchURL} from '../config'
import {parseCategoryData, parseFacets, parseProductListData, parseSortOptions} from './parsers'
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

export const initProductListPage = (url, routeName) => (dispatch, getState) => {
    const pathKey = urlToPathKey(url)
    const pathKeyWithoutQuery = urlToBasicPathKey(pathKey)
    const isSearch = pathKey.includes(getSearchURL())
    const categoryId = !isSearch ? extractLastPartOfURL(url) : null
    const pageNumber = getQueryStringValue('p') ? getQueryStringValue('p') - 1 : 0
    const sortOption = getQueryStringValue('sort') || 'relevance'
    const appliedFilters = getQueryStringValue('filters')
    const searchTerm = getQueryStringValue('q')
    let categoryName
    const searchEndpoint = isSearch ?
        getFreeTextSearchEndPoint(searchTerm, pageNumber, sortOption, appliedFilters ? `:${appliedFilters}` : '') :
        getSearchEndPoint(categoryId, pageNumber, sortOption, appliedFilters ? `:${appliedFilters}` : '')

    // Clean active filter if there isn't any filter applied in query string
    if (!appliedFilters) {
        dispatch(changeFilterTo(null))
    }

    if (isSearch) {
        dispatch(receiveCategoryInformation(pathKeyWithoutQuery, {
            id: pathKey,
            href: pathKeyWithoutQuery,
            parentId: null,
            searchTerm,
            title: `Search results for ${searchTerm}`
        }))
    }

    if (categoryId || searchTerm) {
        return fetchCategoryInfo(categoryId)
            .then((response) => {
                if (!isSearch) {
                    categoryName = response.name
                }
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
                const productListData = parseProductListData(responseJSON)
                const categoryData = parseCategoryData(responseJSON)
                const parentCategoryPath = getParentCategoryPath(pathKey, categoryId)

                // Receive page contents
                dispatch(receiveProductListProductData(productListData))
                dispatch(receiveCategoryContents(pathKey, categoryData))

                // Receive category hierarchy information
                if (!isSearch) {
                    dispatch(receiveCategoryInformation(pathKeyWithoutQuery, {
                        id: pathKey,
                        href: pathKeyWithoutQuery,
                        parentId: parentCategoryPath,
                        title: categoryName
                    }))
                    dispatch(getParentCategoryInfo(parentCategoryPath))
                }

                // Receive sort options
                const sortOptions = parseSortOptions(responseJSON)
                if (sortOptions.length > 0) {
                    dispatch(receiveCategorySortOptions(pathKeyWithoutQuery, sortOptions))
                }

                // Receive filters
                const filterOptions = parseFacets(responseJSON, appliedFilters)
                if (filterOptions.length > 0 && !appliedFilters) {
                    dispatch(receiveCategoryFilterOptions(pathKeyWithoutQuery, filterOptions))
                }
                if (appliedFilters) {
                    dispatch(changeFilterTo(appliedFilters))
                }
            })
    }
    return Promise.resolve()
}
