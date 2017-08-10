/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getSiteID, getCategoryPath} from './config'
import {formatPrice} from './utils'

const parseImages = (imageGroups) => {
    const largeImages = imageGroups.filter((imageGroup) => imageGroup.view_type === 'large')[0]

    return largeImages.images.map(({alt, link}) => ({
        alt,
        src: link
    }))
}

/* eslint-disable camelcase */
const parseVariationCategories = (variation_attributes) => {
    return variation_attributes.map(({id, name, values}) => ({
        id,
        name: id,
        label: name,
        values: values.map(({name, value}) => ({
            label: name,
            value
        }))
    }))
}

const setInitialVariantValues = (variants, id, variationCategories) => {
    const currentVariant = variants.find(({product_id}) => product_id === id)

    if (currentVariant) {
        return currentVariant.variation_values
    }

    const defaultVariant = {}
    variationCategories.forEach(({id, values}) => {
        defaultVariant[id] = values[0].value
    })

    return defaultVariant
}


export const getProductHref = (productID) => `/s/${getSiteID()}/${productID}.html`

export const parseProductDetails = ({id, name, price, inventory, long_description, image_groups, variants, variation_attributes}) => {
    const images = parseImages(image_groups)
    return {
        id,
        title: name,
        price: `${formatPrice(price)}`,
        description: long_description,
        available: inventory.orderable,
        thumbnail: images[0],
        images,
        initialValues: variants ? setInitialVariantValues(variants, id, variation_attributes) : {},
        variationCategories: variants ? parseVariationCategories(variation_attributes) : [],
        variants: variants ? variants.map(({product_id, variation_values}) => {
            return {
                id: product_id,
                values: variation_values
            }
        }) : []
    }
}

export const parseBasketContents = ({product_items, product_sub_total, product_total, order_total}) => {
    let summary_count = 0
    const items = product_items ? product_items.map(({item_id, product_name, product_id, base_price, quantity}) => {
        summary_count += quantity
        return {
            product_name,
            product_price: `${formatPrice(base_price)}`,
            product_image: {},
            qty: quantity,
            // item_id is different from product_id
            // it is used when updating the item in the cart
            // (delete item, update item qty etc)
            item_id,
            // product_id is used to describe which product the item is
            // (used to fetch product images, or build the product URL etc)
            product_id
        }
    }) : []
    return {
        items,
        subtotal: formatPrice(product_total),
        subtotal_excl_tax: formatPrice(product_sub_total),
        summary_count,
        orderTotal: order_total
    }
}

/* eslint-enable camelcase */

export const getCurrentProductID = (url) => {
    let productID

    let productIDMatch = /\/([^/]+).html/.exec(url)

    if (productIDMatch) {
        productID = productIDMatch[1]
    }

    if (!productID) {
        // Cart edit style: https://.../checkout/cart/configure/id/{basket_id}/product_id/{product_id}/
        productIDMatch = /product_id\/(\d+)/.exec(url)
        productID = productIDMatch ? productIDMatch[1] : ''
    }

    console.log('[getCurrentProductID]', productID)
    return productID
}

export const parseAddressResponse = ({
                            first_name,
                            last_name,
                            phone,
                            postal_code,
                            address1,
                            address2,
                            city,
                            state_code,
                            preferred,
                            country_code,
                            address_id
                        }) => {

    return {
        firstname: first_name,
        lastname: last_name ? last_name : '', // eslint-disable-line
        telephone: phone,
        postcode: postal_code,
        addressLine1: address1,
        addressLine2: address2,
        preferred,
        id: address_id,
        city,
        countryId: country_code.toUpperCase(),
        regionId: state_code,
        region: state_code
    }
}
export const getInitialSelectedVariant = (variants, initialValues) => {
    return variants.find(({values}) => {
        return Object.keys(values).every((key) => {
            return values[key] === initialValues[key]
        })
    })
}

export const parseCategories = (categories) => {
    return categories.map((category) => {
        return {
            title: category.name,
            path: getCategoryPath(category.id),
            isCategoryLink: true,
            children: category.categories ? parseCategories(category.categories) : []
        }
    })
}

export const parseProductHit = ({product_id, product_name, price, prices, orderable, image}) => {
    // Some products don't have _any_ pricing on them!
    const finalPrice = price || (prices && prices['usd-sale-prices']) || undefined
    const thumbnail = image ? {
        alt: image.alt,
        src: image.link
    } : undefined

    return {
        id: product_id,
        title: product_name,
        price: finalPrice ? formatPrice(finalPrice) : '$ N/A',
        available: orderable,
        href: getProductHref(product_id),
        thumbnail,
        images: [thumbnail]
    }
}

export const parseProductListData = (products) => {
    const productListData = {}

    products.forEach((productHit) => {
        productListData[productHit.product_id] = parseProductHit(productHit)
    })
    return productListData
}

export const parseSortedProductKeys = (products) => {
    const sortedProductKeys = []

    products.forEach((productHit) => {
        sortedProductKeys.push(productHit.product_id)
    })
    return sortedProductKeys
}

export const parseSearchSuggestions = ({product_suggestions: {products}}) => {
    if (!products) {
        return []
    }

    const suggestions = products.map((suggestion) => {
        const productIdMatch = suggestion.link.match(/products\/(.*?)\?/)
        const productId = productIdMatch ? productIdMatch[1] : ''

        return {
            href: getProductHref(productId),
            children: suggestion.product_name
        }
    })

    return suggestions
}

export const parseWishlistProducts = (wishlistData) => {
    if (wishlistData.customer_product_list_items) {
        return wishlistData.customer_product_list_items.map((wishlistItem) => {
            const productId = wishlistItem.product_id
            return {
                productId,
                quantity: wishlistItem.quantity,
                itemID: wishlistItem.id
            }
        })
    }
    return []
}

export const parseFilterOptions = (refinements) => {
    return refinements.reduce((filters, filter) => {
        if (filter.attribute_id !== 'cgid' && filter.values) {
            let uniqueKey = 0
            const ruleset = filter.attribute_id

            const kinds = filter.values.map((kind) => {
                return {
                    count: kind.hit_count,
                    label: kind.label,
                    query: kind.presentation_id ? kind.presentation_id : `${uniqueKey++}`,
                    ruleset: filter.label,
                    searchKey: `${ruleset}=${kind.value}`
                }
            })

            filters.push({
                label: filter.label,
                ruleset,
                kinds,
            })
        }
        return filters
    }, [])
}

export const parseOrdersResponse = ({data}) => {
    const ordersMap = {}
    data.forEach(({
        order_no,
        confirmation_status,
        creation_date,
        billing_address,
        order_total
    }) => {
        ordersMap[order_no] = {
            orderNumber: order_no,
            date: creation_date,
            shipTo: billing_address.address1,
            total: order_total,
            status: confirmation_status
        }
    })

    return ordersMap
}
