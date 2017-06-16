/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {extractMagentoJson} from '../../../utils/magento-utils'
import {getTextFrom, parseTextLink, parseImage, parseProductID} from '../../../utils/parser-utils'

const UENC_REGEX = /\/uenc\/([^/,]+),*\//

const parseCarouselItems = (magentoObject) => {
    const carouselSetup = magentoObject
          .getIn(['[data-gallery-role=gallery-placeholder]', 'mage/gallery/gallery', 'data'])
          .sortBy((item) => item.get('position'))
    return carouselSetup.toJS()
}

const parseVariationCategories = (magentoObject) => {
    const optionList = magentoObject
            .getIn(['#product_addtocart_form', 'configurable', 'spConfig', 'attributes'])
            .toJS()

    return Object.keys(optionList).map((key) => optionList[key])
}

const parseVariantIds = (variationCategories) => variationCategories
                                                .map((category) => category.options)
                                                .reduce((a, b) => a.concat(b))
                                                .reduce((a, b) => a.products && b.products ? a.products.concat(b.products) : a) //eslint-disable-line
                                                .sort()


const buildVariantFromId = (id, variationCategories) => {
    return {
        attributes: variationCategories.map((category) => {
            const selectedCategory = category.options.find((option) => option.products.find((product) => product === id)) // lol
            return {
                id: category.id,
                code: category.code,
                label: category.label,
                values: {
                    id: selectedCategory.id,
                    label: selectedCategory.label,
                }
            }
        })
    }
}

const buildVariants = (magentoObject, variationCategories) => {
    const variantIds = parseVariantIds(variationCategories)
    const variants = {}
    variantIds.forEach((id) => {
        variants[id] = buildVariantFromId(id, variationCategories)
    })

    return variants
}

const carouselItemsToImages = (carouselItems) => {
    return carouselItems.map(({img, isMain, full, thumb, caption}) => ({
        alt: '',
        src: img,
        isMain,
        zoomSrc: full,
        thumbnailSrc: thumb,
        caption,
    }))
}

const parseBreadcrumbs = ($, $breadcrumbsLinks) => {
    return $breadcrumbsLinks.get()
        .map((breadcrumbLink) => parseTextLink($(breadcrumbLink)))
}

const getAvailabilityFrom = ($content) => {
    const availability = getTextFrom($content, '.product-info-stock-sku [title="Availability"]')
    return availability.toLowerCase() === 'in stock'
}

export const productDetailsParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')
    const magentoObject = extractMagentoJson($html)
    const carouselItems = parseCarouselItems(magentoObject)
    const images = carouselItemsToImages(carouselItems)
    const variationCategories = parseVariationCategories(magentoObject)
    const variants = buildVariants(magentoObject, variationCategories)

    // keys are different on SFCC & merlins (options vs values)
    variationCategories.forEach((category) => {
        category.values = category.options
    })

    return {
        id: $mainContent.find('#product_addtocart_form input[name="product"]').val(),
        title: getTextFrom($mainContent, '.page-title-wrapper.product .page-title > span'),
        price: getTextFrom($mainContent, '.product-info-price .price-wrapper .price'),
        description: getTextFrom($mainContent, '.product.info.detailed .product.attibute.description p'),
        available: getAvailabilityFrom($mainContent),
        images,
        variants,
        variationCategories,
        thumbnail: images[0]
    }
}

export const productDetailsUIParser = ($, $html) => {
    const $breadcrumbs = (
        $html
            .find('.breadcrumbs')
            .find('li')
            .not(':last-child')
            .find('a')
    )

    const $form = $html.find('.page-main #product_addtocart_form')

    return {
        breadcrumbs: parseBreadcrumbs($, $breadcrumbs),
        itemQuantity: parseInt($form.find('#qty').val())
    }
}

export const pdpAddToCartFormParser = ($, $html) => {
    const $form = $html.find('.page-main #product_addtocart_form')

    const hiddenInputs = {}
    $form.find('input[type="hidden"]').each((idx, input) => {
        const $input = $(input)
        hiddenInputs[$input.attr('name')] = $input.val()
    })
    const uencMatch = UENC_REGEX.exec($form.attr('action'))
    const uenc = uencMatch ? uencMatch[1] : ''

    return {
        submitUrl: $form.attr('action'),
        method: $form.attr('method'),
        uenc,
        hiddenInputs
    }
}

export const productListParser = ($, $html) => {
    const $products = $html.find('.item.product-item')

    const productMap = {}
    $products.each((_, product) => {
        const $product = $(product)
        const link = parseTextLink($product.find('.product-item-link'))
        const productId = parseProductID($product)
        const thumbnail = parseImage($product.find('.product-image-photo'))
        const available = $product.find('.stock.unavailable').length === 0

        productMap[productId] = {
            id: productId,
            title: link.text,
            price: getTextFrom($product, '.price'),
            available,
            href: link.href,
            thumbnail,
            images: [thumbnail]
        }
    })
    return productMap
}
