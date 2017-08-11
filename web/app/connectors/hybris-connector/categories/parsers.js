/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {parseProductDetails} from '../parsers'

export const parseProductListData = ({products = []}) => {
    const productListData = {}
    if (products.length) {
        products.forEach((product) => {
            const productDetailsData = {...parseProductDetails(product)}
            const {id} = productDetailsData
            productListData[id] = productDetailsData
        })
    }
    return productListData
}

export const parseCategoryData = ({pagination, products = []}) => {
    const categoryData = {
        itemCount: pagination.totalResults,
        products: []
    }
    if (products.length) {
        products.forEach((product) => {
            categoryData.products.push(product.code)
        })
    }
    return categoryData
}

export const parseSortOptions = ({sorts = []}) => {
    return sorts.map(({code, name}) => ({
        id: code,
        label: name
    }))
}

export const parseFacets = ({facets = []}, appliedFilters) => {
    return facets.map(({name, values}) => {
        const ruleset = name.toLowerCase()
        const kinds = values.map(({count, name, query, selected}) => {
            let filterQuery = ''
            const queryValues = query.query.value.split(':')
            const queryValuesLength = queryValues.length
            if (queryValuesLength) {
                filterQuery = encodeURIComponent(`${queryValues[queryValuesLength - 2]}:${queryValues[queryValuesLength - 1]}`)
            }
            return {
                count,
                label: name,
                query: !selected ? filterQuery : appliedFilters,
                searchKey: !selected ? filterQuery : appliedFilters,
                ruleset,
            }
        })
        return {
            label: name,
            ruleset,
            kinds
        }
    })
}
