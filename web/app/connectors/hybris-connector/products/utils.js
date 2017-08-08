export const getProductHref = (productID) => `/product_id/${productID}`

export const getProductIDFromURL = (url) => {
    if (!url) {
        return ''
    }
    const splitURL = url.split('/')
    return splitURL[splitURL.length - 1]
}

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
