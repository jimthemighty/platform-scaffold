/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {STOCK_STATUS} from './constants'
import {getCategoryPath, getImageType, getImageSize, getVariantQualifier, getVariantType} from './config'


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
        const galleryImages = images.filter((image) => image.imageType === getImageType('gallery'))
        const productImages = galleryImages.filter((image) => image.format === getImageSize('product'))
        const thumbnailImages = galleryImages.filter((image) => image.format === getImageSize('thumbnail'))
        const zoomImages = galleryImages.filter((image) => image.format === getImageSize('zoom'))
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

export const findOption = (options, attribute, value) => {
    return options.find((option) => option[attribute] === value) || null
}

const parseVariantionOptions = (variantOptions, qualifierType, variantType) => {
    const variantQualifier = findOption(variantOptions[0].variantOptionQualifiers, 'qualifier', qualifierType)
    const values = variantOptions.map((option) => ({
        label: findOption(option.variantOptionQualifiers, 'qualifier', qualifierType).value,
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

const parseVariationCategories = (baseOptions, variantOptions, variantType) => {
    const variationCategories = []
    if (baseOptions.length) {
        baseOptions.forEach((baseOptions) => {
            const variantType = baseOptions.variantType
            const parsedVariantionOptions = parseVariantionOptions(baseOptions.options, getVariantQualifier(variantType), variantType)
            variationCategories.push(parsedVariantionOptions)
        })
    }
    if (variantOptions.length) {
        const parsedVariantionOptions = parseVariantionOptions(variantOptions, getVariantQualifier(variantType), variantType)
        variationCategories.push(parsedVariantionOptions)
    }
    return variationCategories
}

const parseVariants = (baseOptions, variantOptions, variantType) => {
    let variants = []
    if (baseOptions.length) {
        const styleVariantOptions = findOption(baseOptions, 'variantType', getVariantType('style'))
        const sizeVariantOptions = findOption(baseOptions, 'variantType', getVariantType('size'))
        const selectedStyleVariant = styleVariantOptions ? styleVariantOptions.selected.code : ''
        if (sizeVariantOptions && styleVariantOptions) {
            variants = sizeVariantOptions.options.map((option) => {
                const id = option.code
                const values = {
                    [styleVariantOptions.variantType]: selectedStyleVariant,
                    [sizeVariantOptions.variantType]: id
                }
                return {id, values}
            })
        } else if (styleVariantOptions && variantOptions) {
            variants = variantOptions.map((option) => {
                const id = selectedStyleVariant
                const values = {
                    [styleVariantOptions.variantType]: selectedStyleVariant,
                    [variantType]: option.code
                }
                return {id, values}
            })
        } else if (styleVariantOptions) {
            variants = styleVariantOptions.options.map((option) => {
                const id = option.code
                const values = {
                    [styleVariantOptions.variantType]: id
                }
                return {id, values}
            })
        }
    } else if (variantOptions) {
        variants = variantOptions.map((option) => {
            const id = option.code
            const values = {
                [variantType]: id
            }
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

export const getProductHref = (productID) => `/product_id/${productID}`

export const parseProductDetails = ({baseOptions = [], code, description, images, name, price, stock, variantOptions = [], variantType}) => {
    const hasVariations = baseOptions.length || variantOptions.length
    const variationCategories = hasVariations ? parseVariationCategories(baseOptions, variantOptions, variantType) : []
    const variants = parseVariants(baseOptions, variantOptions, variantType)
    images = parseImages(images)
    return {
        id: code,
        title: name,
        price: price.formattedValue,
        description,
        available: stock.stockLevelStatus !== STOCK_STATUS.OUT_OF_STOCK && stock.stockLevel > 0,
        thumbnail: images.length && images[0],
        images,
        initialValues: variants ? setInitialVariantValues(variants, code, variationCategories) : {},
        variationCategories,
        variants,
    }
}
