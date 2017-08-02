/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */
import {
    receiveProductDetailsProductData,
    receiveProductDetailsUIData
} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {setCurrentURL, receiveCurrentProductId} from 'progressive-web-sdk/dist/integration-manager/results'
import {receiveFormInfo} from '../actions'
import {makeApiRequest} from '../utils'
import {getInitialSelectedVariant, getProductHref, parseProductDetails} from '../parsers'

export const initProductDetailsPage = (url, routeName) => (dispatch) => {
    console.log('[Hybris Connector] Called initProductDetailsPage with arguments:', url, routeName)
    const splitURL = url.split('/')
    const productPathKey = splitURL[splitURL.length - 1]
    const productURL = `/products/${productPathKey}?fields=FULL`
    return makeApiRequest(productURL, {method: 'GET'})
        .then((response) => {
            console.log('## response', response)
            const productDetailsData = {
                ...parseProductDetails(response),
                href: productPathKey
            }
            console.log('## productDetailsData', productDetailsData)
            if (!response.purchasable) {
                const {variants, initialValues} = productDetailsData
                const defaultVariant = getInitialSelectedVariant(variants, initialValues)
                const currentProductHref = defaultVariant.values[response.variantType]
                dispatch(setCurrentURL(getProductHref(currentProductHref)))
                dispatch(initProductDetailsPage(currentProductHref))
            } else {
                const {id} = productDetailsData
                const productDetailsMap = {
                    [id]: productDetailsData
                }
                /* TODO review this part */
                productDetailsData.variants.forEach(({id}) => {
                    productDetailsMap[id] = productDetailsData
                })
                const UIData = {
                    [id]: {
                        breadcrumbs: [{
                            href: '/',
                            text: 'Home'
                        }, {
                            href: response.url,
                            text: response.name
                        }],
                        itemQuantity: 1
                    }
                }
                const exampleFormData = {
                    [id]: {
                        submitUrl: 'submit',
                        method: 'POST',
                        uenc: '',
                        hiddenInputs: {}
                    }
                }

                dispatch(receiveCurrentProductId(id))
                dispatch(receiveProductDetailsProductData(productDetailsMap))
                dispatch(receiveProductDetailsUIData(UIData))
                dispatch(receiveFormInfo(exampleFormData))
            }
            return Promise.resolve()
        })
}

export const getProductVariantData = (variationSelections, variants, categoryIds) => (dispatch) => {
    console.log('[Hybris Connector] Called getProductVariantData stub with arguments:', variationSelections, variants, categoryIds)
    return Promise.resolve()
}

export const addItemToWishlist = (productId, productURL) => (dispatch) => {
    console.log('[Hybris Connector] Called addItemToWishlist stub with arguments:', productId, productURL)
    return Promise.resolve()
}
