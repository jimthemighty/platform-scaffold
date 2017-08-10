/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */
import {
    receiveProductDetailsProductData,
    receiveProductDetailsUIData
} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {setCurrentURL, receiveCurrentProductId} from 'progressive-web-sdk/dist/integration-manager/results'
import {getProductById} from 'progressive-web-sdk/dist/store/products/selectors'
import {getProductEndPoint} from '../config'
import {extractLastPartOfURL, makeApiRequest} from '../utils'
import {parseProductDetails} from '../parsers'
import {getProductHref, getDefaultVariantId} from './utils'
import {ADD_TO_CART_FORM_NAME} from '../../../store/form/constants'

const loadProduct = (productDetailsData) => (dispatch) => {
    const {id} = productDetailsData
    const productDetailsMap = {
        [id]: productDetailsData
    }
    const UIData = {
        [id]: {
            breadcrumbs: [{
                href: '/',
                text: 'Home'
            }, {
                href: productDetailsData.href,
                text: productDetailsData.title
            }],
            itemQuantity: 1
        }
    }
    dispatch(receiveCurrentProductId(id))
    dispatch(receiveProductDetailsProductData(productDetailsMap))
    dispatch(receiveProductDetailsUIData(UIData))
    return Promise.resolve()
}

export const initProductDetailsPage = (url, routeName) => (dispatch, getState) => {
    const productId = extractLastPartOfURL(url)
    const productEndpoint = getProductEndPoint(productId)
    const currentState = getState()
    const productState = getProductById(productId)(currentState).toJS()
    const productStateDefaultVariantId = getDefaultVariantId(productState)

    if ((!productState || !productState.full) && productId) {
        return makeApiRequest(productEndpoint, {method: 'GET'})
            .then((response) => {
                if (response.status === 400) {
                    return Promise.reject()
                } else {
                    return response.json()
                }
            })
            .then((responseJSON) => {
                const currentPath = extractLastPartOfURL(window.location.pathname)
                const productDetailsData = {...parseProductDetails(responseJSON, true)}

                dispatch(loadProduct(productDetailsData))

                if (!productDetailsData.purchasable) {
                    const defaultVariantId = getDefaultVariantId(productDetailsData)
                    if (defaultVariantId) {
                        dispatch(initProductDetailsPage(defaultVariantId))
                    }
                } else if (currentPath !== productId) {
                    dispatch(setCurrentURL(getProductHref(productId)))
                }
            })
    } else if (!productState.purchasable && productStateDefaultVariantId) {
        return dispatch(initProductDetailsPage(productStateDefaultVariantId))
    } else {
        return dispatch(loadProduct(productState))
    }
}

export const getProductVariantData = (variationSelections, variants, categoryIds) => (dispatch, getState) => {
    const currentState = getState()
    const oldVariantSelection = currentState.form[ADD_TO_CART_FORM_NAME].initial
    const changedVariantKey = Object.keys(oldVariantSelection).find((k) => oldVariantSelection[k] !== variationSelections[k])
    if (changedVariantKey) {
        const selectedProductID = variationSelections[changedVariantKey]
        const productState = getProductById(selectedProductID)(currentState).toJS()
        if (!productState || !productState.full) {
            const productHref = getProductHref(selectedProductID)
            dispatch(setCurrentURL(productHref))
            dispatch(initProductDetailsPage(productHref))
        } else if (!productState.purchasable) {
            const defaultVariantId = getDefaultVariantId(productState)
            if (defaultVariantId) {
                dispatch(initProductDetailsPage(defaultVariantId))
            }
        } else {
            dispatch(loadProduct(productState))
        }
    }
    return Promise.resolve()
}

export const addItemToWishlist = (productId, productURL) => (dispatch) => {
    console.log('[Hybris Connector] Called addItemToWishlist stub with arguments:', productId, productURL)
    return Promise.resolve()
}
