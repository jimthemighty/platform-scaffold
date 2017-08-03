/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getCategoryPath} from './config'

export const getProductHref = (productID) => `/p/${productID}`

export const parseCategories = (categories, root = '') => {
    return categories.map((category) => {
        const path = root ? `${root}/${category.id}` : category.id
        return {
            title: category.name,
            path: getCategoryPath(path),
            isCategoryLink: true,
            children: category.subcategories ? parseCategories(category.subcategories, path) : []
        }
    })
}
