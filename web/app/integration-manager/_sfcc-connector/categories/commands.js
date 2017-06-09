/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeApiRequest} from '../utils'
import {receiveCategoryContents, receiveCategoryInformation} from '../../categories/results'
import {receiveProductListProductData} from '../../products/results'
import {parseProductListData} from '../parsers'

import {getCategoryPath} from '../config'

const makeCategoryURL = (id) => `/categories/${id}`
const makeCategorySearchURL = (id) => `/product_search?expand=availability,images,prices&q=&refine_1=cgid=${id}`

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
    const categoryIDMatch = /\/([^/]+)$/.exec(url)
    return categoryIDMatch ? categoryIDMatch[1] : ''
}

export const initProductListPage = (url) => (dispatch) => {
    const categoryID = extractCategoryId(url)

    return dispatch(fetchCategoryInfo(categoryID))
        .then(() => makeApiRequest(makeCategorySearchURL(categoryID), {method: 'GET'}))
        .then((response) => response.json())
        .then(({hits, total}) => {
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
