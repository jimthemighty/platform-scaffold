/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeApiRequest} from '../utils'
import {receiveCategoryContents, receiveCategoryInformation, receiveCategorySortOptions} from '../../categories/results'
import {receiveProductListProductData} from '../../products/results'
import {parseProductListData} from '../parsers'
import {ITEMS_PER_PAGE} from '../../../containers/product-list/constants'

import {getCategoryPath} from '../config'

const makeCategoryURL = (id) => `/categories/${id}`
const makeCategorySearchURL = (id, start, sortOption) => `/product_search?expand=availability,images,prices&q=&refine_1=cgid=${id}&count=${ITEMS_PER_PAGE}&start=${start}&sort=${sortOption}`

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

const fetchCategoryInfo = (id) => (dispatch) => (
    makeApiRequest(makeCategoryURL(id), {method: 'GET'})
        .then((response) => response.json())
        .then(processCategory(dispatch))
)

const extractCategoryId = (url) => {
    const pathKeyMatch = /\/([^/]+)$/.exec(url)
    const categoryIDMatch = pathKeyMatch ? pathKeyMatch[1].match(/([^?]*)|([^?]*)\?.*/) : ''
    return categoryIDMatch ? categoryIDMatch[1] : ''
}

const extractPageNumber = (url) => {
    const pageMatch = url.match(/page=(.*)/)
    return pageMatch ? pageMatch[1] : '1'
}

const extractSortOption = (url) => {
    const sortOption = url.match(/sort=(.*)/)
    return sortOption ? sortOption[1] : ''
}

export const initProductListPage = (url) => (dispatch) => {
    const categoryID = extractCategoryId(url)
    const start = (parseInt(extractPageNumber(url)) - 1) * ITEMS_PER_PAGE
    const sortOption = extractSortOption(url)
    return dispatch(fetchCategoryInfo(categoryID))
        .then(() => makeApiRequest(makeCategorySearchURL(categoryID, start, sortOption), {method: 'GET'}))
        .then((response) => response.json())
        .then(({total, hits, sorting_options}) => {
            if (sorting_options.length > 0) {
                dispatch(receiveCategorySortOptions(sorting_options))
            }

            if (total === 0) {
                dispatch(receiveCategoryContents(urlToPathKey(url), {
                    products: [],
                    itemCount: total
                }))
                return
            }

            const productListData = parseProductListData(hits)
            const products = Object.keys(productListData)

            dispatch(receiveProductListProductData(productListData))
            dispatch(receiveCategoryContents(urlToPathKey(url), {
                products,
                itemCount: total
            }))
        })
}
