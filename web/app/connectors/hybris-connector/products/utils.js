/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {PATHS} from '../constants'

export const getProductHref = (productID) => `/${PATHS.PDP}/${productID}`

const getInitialSelectedVariant = (variants = [], initialValues) => {
    return variants.find(({values}) => {
        return Object.keys(values).every((key) => {
            return values[key] === initialValues[key]
        })
    })
}

export const getDefaultVariantId = (productDetailsData) => {
    const {variants, initialValues} = productDetailsData
    const defaultVariant = getInitialSelectedVariant(variants, initialValues)
    const defaultVariantId = defaultVariant ? defaultVariant.values[productDetailsData.variantType] : null
    return defaultVariantId
}

export const setInitialVariantValues = (variants, id, variationCategories) => {
    const currentVariant = variants.find((variant) => variant.id === id)
    if (currentVariant) {
        return currentVariant.values
    }

    const defaultVariant = {}
    variationCategories.forEach(({id, values}) => {
        defaultVariant[id] = values[0].value
    })

    return defaultVariant
}
