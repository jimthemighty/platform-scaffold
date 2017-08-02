/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {IMAGE_SIZES, IMAGE_TYPES, STOCK_STATUS, QUALIFIERS, VARIANTS} from './constants'
import {getCategoryPath} from './config'

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

const parseImages = (images) => {
    let parsedImages = []
    if (images) {
        const galleryImages = images.filter((image) => image.imageType === IMAGE_TYPES.GALLERY)
        const productImages = galleryImages.filter((image) => image.format === IMAGE_SIZES.PRODUCT)
        const thumbnailImages = galleryImages.filter((image) => image.format === IMAGE_SIZES.THUMBNAIL)
        const zoomImages = galleryImages.filter((image) => image.format === IMAGE_SIZES.ZOOM)
        parsedImages = productImages.map((media, index) => {
            const thumbMedia = thumbnailImages.find((image) => image.galleryIndex === index)
            const zoomMedia = zoomImages.find((image) => image.galleryIndex === index)
            return {
                alt: media.altText,
                src: media.url,
                thumbnailSrc: thumbMedia ? thumbMedia.url : '',
                zoomSrc: zoomMedia ? zoomMedia.url : '',
            }
        })
    }
    return parsedImages
}

const parseVariantionOptions = (variantOptions = [], qualifierType, variantType) => {
    const variantQualifier = variantOptions[0].variantOptionQualifiers.find((optionQualifier) => optionQualifier.qualifier === qualifierType)
    const values = variantOptions.map((option) => ({
        label: option.variantOptionQualifiers.find((optionQualifier) => optionQualifier.qualifier === qualifierType).value,
        value: option.code,
    }))
    const variationCategory = {
        id: variantType,
        label: variantQualifier.name,
        name: variantType,
        values
    }
    return variationCategory
}

const parseVariationCategories = (product) => {
    const variationCategories = []
    const baseOptions = product.baseOptions || []
    if (baseOptions.length) {
        baseOptions.forEach((baseOptions) => {
            const variantType = baseOptions.variantType
            const parsedVariantionOptions = parseVariantionOptions(baseOptions.options, QUALIFIERS[variantType], variantType)
            variationCategories.push(parsedVariantionOptions)
        })
    }
    if (product.variantOptions) {
        const variantType = product.variantType
        const parsedVariantionOptions = parseVariantionOptions(product.variantOptions, QUALIFIERS[variantType], variantType)
        variationCategories.push(parsedVariantionOptions)
    }
    return variationCategories
}

const parseVariants = (product) => {
    const baseOptions = product.baseOptions || []
    let variants = []
    if (baseOptions.length) {
        const styleVariantOptions = baseOptions.find((option) => option.variantType === VARIANTS.STYLE) || null
        const sizeVariantOptions = baseOptions.find((option) => option.variantType === VARIANTS.SIZE) || null
        const selectedStyleVariant = styleVariantOptions.selected.code
        if (sizeVariantOptions && styleVariantOptions) {
            variants = sizeVariantOptions.options.map((option) => {
                const id = option.code
                const values = {
                    [styleVariantOptions.variantType]: selectedStyleVariant,
                    [sizeVariantOptions.variantType]: id
                }
                return {id, values}
            })
        } else if (styleVariantOptions && product.variantOptions) {
            variants = product.variantOptions.map((option) => {
                const id = selectedStyleVariant
                const values = {
                    [styleVariantOptions.variantType]: selectedStyleVariant,
                    [product.variantType]: option.code
                }
                return {id, values}
            })
        } else if (styleVariantOptions) {
            variants = styleVariantOptions.options.map((option) => {
                const id = option.code
                const values = {[styleVariantOptions.variantType]: id}
                return {id, values}
            })
        }
    } else if (product.variantOptions) {
        variants = product.variantOptions.map((option) => {
            const {variantType} = product
            const id = option.code
            const values = {[variantType]: id}
            return {id, values}
        })
    }
    return variants
}

const setInitialVariantValues = (variants, id, variationCategories) => {
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

export const getInitialSelectedVariant = (variants, initialValues) => {
    return variants.find(({values}) => {
        return Object.keys(values).every((key) => {
            return values[key] === initialValues[key]
        })
    })
}

export const getProductHref = (productID) => `/p/${productID}`

export const parseProductDetails = (product) => {
    const id = product.code
    const images = parseImages(product.images)
    const variationCategories = parseVariationCategories(product)
    const variants = parseVariants(product)
    return {
        id,
        title: product.name,
        price: product.price.formattedValue,
        description: product.description,
        available: product.purchasable && product.stock.stockLevelStatus !== STOCK_STATUS.OUT_OF_STOCK && product.stock.stockLevel > 0,
        thumbnail: images.length && images[0],
        images,
        initialValues: variants ? setInitialVariantValues(variants, id, variationCategories) : {},
        variationCategories,
        variants,
    }
}
