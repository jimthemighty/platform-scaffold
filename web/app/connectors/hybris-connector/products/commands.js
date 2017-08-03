/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */
import {
    receiveProductDetailsProductData,
    receiveProductDetailsUIData
} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {setCurrentURL, receiveCurrentProductId} from 'progressive-web-sdk/dist/integration-manager/results'
import {makeApiRequest} from '../utils'
import {getInitialSelectedVariant, getProductHref, parseProductDetails} from '../parsers'
import {ADD_TO_CART_FORM_NAME} from '../../../store/form/constants'


export const initProductDetailsPage = (url, routeName) => (dispatch) => {
    console.log('[Hybris Connector] Called initProductDetailsPage with arguments:', url, routeName)
    const splitURL = url.split('/')
    const productPathKey = splitURL[splitURL.length - 1]
    const productURL = `/products/${productPathKey}?fields=FULL`
    return makeApiRequest(productURL, {method: 'GET'})
        .then((response) => response.json())
        .then((responseJSON) => {
            const productDetailsData = {
                ...parseProductDetails(responseJSON),
                href: getProductHref(productPathKey)
            }
            const {id} = productDetailsData
            if (!responseJSON.purchasable) {
                const {variants, initialValues} = productDetailsData
                const defaultVariant = getInitialSelectedVariant(variants, initialValues)
                const currentProductHref = defaultVariant.values[responseJSON.variantType]
                dispatch(initProductDetailsPage(currentProductHref))
            } else {
                if (window.location.pathname.indexOf(id) < 0) {
                    dispatch(setCurrentURL(getProductHref(id)))
                }
                const productDetailsMap = {
                    [id]: productDetailsData
                }
                const UIData = {
                    [id]: {
                        breadcrumbs: [{
                            href: '/',
                            text: 'Home'
                        }, {
                            href: responseJSON.url,
                            text: responseJSON.name
                        }],
                        itemQuantity: 1
                    }
                }
                dispatch(receiveCurrentProductId(id))
                dispatch(receiveProductDetailsProductData(productDetailsMap))
                dispatch(receiveProductDetailsUIData(UIData))
            }
            return Promise.resolve()
        })
}

export const getProductVariantData = (variationSelections, variants, categoryIds) => (dispatch, getState) => {
    const currentVariantSelection = getState().form[ADD_TO_CART_FORM_NAME].initial
    Object.keys(currentVariantSelection).forEach((key) => {
        if (currentVariantSelection[key] !== variationSelections[key]) {
            const currentProductHref = getProductHref(variationSelections[key])
            dispatch(setCurrentURL(currentProductHref))
            dispatch(initProductDetailsPage(currentProductHref))
        }
    })
    return Promise.resolve()
}

export const addItemToWishlist = (productId, productURL) => (dispatch) => {
    console.log('[Hybris Connector] Called addItemToWishlist stub with arguments:', productId, productURL)
    return Promise.resolve()
}
