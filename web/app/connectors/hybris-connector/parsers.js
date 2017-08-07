/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {DEFAULT_IMAGE, STOCK_STATUS} from './constants'
import {getCategoryPath, getImageType, getImageSize, getVariantQualifier, getVariantType} from './config'
import {parseStyleAndSizeBaseOptions, parseStyleBaseOptionAndVariantOptions, parseStyleOrSizeBaseOption, parseVariantOptions} from './products/parsers'

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

const parseImages = (images = []) => {
    if (images.length) {
        const galleryImages = images.filter((image) => image.imageType === getImageType('gallery'))
        const productImages = galleryImages.filter((image) => image.format === getImageSize('product'))
        const thumbnailImages = galleryImages.filter((image) => image.format === getImageSize('thumbnail'))
        const zoomImages = galleryImages.filter((image) => image.format === getImageSize('zoom'))
        return productImages.map(({altText: alt, url: src}, index) => {
            const {url: thumbnailSrc = ''} = thumbnailImages.find((image) => image.galleryIndex === index)
            const {url: zoomSrc = ''} = zoomImages.find((image) => image.galleryIndex === index)
            return {
                alt,
                src,
                thumbnailSrc,
                zoomSrc
            }
        })
    } else {
        return [DEFAULT_IMAGE]
    }
}

const parseThumbnail = (thumbnail) => {
    if (thumbnail) {
        return {
            alt: thumbnail.altText,
            src: thumbnail.url,
        }
    } else {
        return DEFAULT_IMAGE
    }
}

/**
 * @param {Array} variantOptions- variantOptions of current product
 * @example
 * [
 *   {
 *      "code": "300717433",
 *      "variantOptionQualifiers": [
 *        { "name": "Size", "qualifier": "size", "value": "L"},
 *        { "name": "Style", "qualifier": "style", "value": "heather berry" }
 *       ]
 *   }
 * ]
 *
 * @param {string} qualifierType - the variant qualifier
 * @example "size"
 *
 * @param {string} variantType - the variant type
 * @example "ApparelSizeVariantProduct"
 *
 * @return {Object} - VariationCategory
 * @example
 * {
       "id": "ApparelSizeVariantProduct",
       "label": "Size",
       "name": "ApparelSizeVariantProduct",
       "values": [
            { "label": "S", "value": "1978440"},
            { "label": "M", "value": "1978441"}
       ]
 * }
 */
const parseVariantionOptions = (variantOptions, qualifierType, variantType) => {
    const variantQualifier = variantOptions[0].variantOptionQualifiers.find((i) => i.qualifier === qualifierType)
    const values = variantOptions.map((option) => {
        const qualifier = option.variantOptionQualifiers.find((i) => i.qualifier === qualifierType)
        return {
            label: qualifier ? qualifier.value : '',
            value: option.code
        }
    })
    const variationCategory = {
        id: variantType,
        label: variantQualifier ? variantQualifier.name : '',
        name: variantType,
        values
    }
    return variationCategory
}

const parseVariationCategories = (baseOptions = [], variantOptions, productVariantType) => {
    const variationCategories = baseOptions.map(({options, variantType}) =>
        parseVariantionOptions(options, getVariantQualifier(variantType), variantType))

    if (variantOptions.length) {
        variationCategories.push(
            parseVariantionOptions(variantOptions, getVariantQualifier(productVariantType), productVariantType))
    }
    return variationCategories
}

const parseVariants = (baseOptions, variantOptions, variantType) => {
    let variants = []
    if (baseOptions.length) {
        const styleBaseOptions = baseOptions.find((i) => i.variantType === (getVariantType('style') || getVariantType('color')))
        const sizeBaseOptions = baseOptions.find((i) => i.variantType === getVariantType('size'))
        if (styleBaseOptions && sizeBaseOptions) {
            variants = parseStyleAndSizeBaseOptions(sizeBaseOptions, styleBaseOptions)
        } else if (styleBaseOptions && variantOptions.length) {
            variants = parseStyleBaseOptionAndVariantOptions(variantOptions, styleBaseOptions, variantType)
        } else if (styleBaseOptions || sizeBaseOptions) {
            variants = parseStyleOrSizeBaseOption(styleBaseOptions || sizeBaseOptions)
        }
    } else if (variantOptions.length) {
        variants = parseVariantOptions(variantOptions, variantType)
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

export const getInitialSelectedVariant = (variants = [], initialValues) => {
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

export const getProductHref = (productID) => `/product_id/${productID}`

export const getProductIDFromURL = (url) => {
    if (!url) {
        return ''
    }
    const splitURL = url.split('/')
    return splitURL[splitURL.length - 1]
}

export const parseProductDetails = ({baseOptions = [], code, description, images = [], name, price, purchasable, summary, stock, variantOptions = [], variantType}) => {
    const hasVariations = baseOptions.length || variantOptions.length
    const variationCategories = hasVariations ? parseVariationCategories(baseOptions, variantOptions, variantType) : []
    const variants = hasVariations ? parseVariants(baseOptions, variantOptions, variantType) : []
    const thumbnail = parseThumbnail(images.find((image) => image.imageType === getImageType('primary') && image.format === getImageSize('thumbnail')))
    const parsedImages = parseImages(images)
    return {
        href: getProductHref(code),
        id: code,
        title: name,
        price: price.formattedValue,
        description: summary + description,
        available: stock.stockLevelStatus !== STOCK_STATUS.OUT_OF_STOCK && stock.stockLevel > 0,
        thumbnail,
        images: parsedImages,
        initialValues: variants ? setInitialVariantValues(variants, code, variationCategories) : {},
        purchasable,
        variationCategories,
        variants,
        variantType,
    }
}
