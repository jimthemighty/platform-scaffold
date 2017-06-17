/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/results'
import {receiveCurrentProductId} from '../../results'
import {fetchPageData} from '../app/commands'
import {receiveFormInfo} from '../actions'
import {myProductDetailsParser} from './parsers'

export const initProductDetailsPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initProductDetailsPage stub with arguments:', url, routeName)

    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res

            const productDetailsData = {
                ...myProductDetailsParser($, $response),
                href: url,
                variationCategories: [],
                variants: []
            }

            const {id} = productDetailsData

            dispatch(receiveCurrentProductId(id))
            // dispatch(receiveProductDetailsUIData({[id]: productDetailsUIParser($, $response)}))
            dispatch(receiveProductDetailsProductData({[id]: productDetailsData}))
            // dispatch(receiveFormInfo({[id]: pdpAddToCartFormParser($, $response)}))
        })
        .catch((error) => { console.info(error.message) })

    // const id = '1'

    // const image = {
    //     src: '//via.placeholder.com/350x350',
    //     alt: 'Jason\'s product'
    // }

    // const exampleData = {
    //     [id]: {
    //         price: '$14.99',
    //         available: true,
    //         href: window.location.href,
    //         thumbnail: image,
    //         title: 'Jason\'s product',
    //         images: [image, image],
    //         id: '1',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    //     }
    // }

    // const exampleUIData = {
    //     [id]: {
    //         breadcrumbs: [{
    //             href: '/',
    //             text: 'Home'
    //         }, {
    //             href: window.location.href,
    //             text: 'Product 1'
    //         }],
    //         itemQuantity: 1
    //     }
    // }

    // const exampleFormData = {
    //     [id]: {
    //         submitUrl: 'submit',
    //         method: 'POST',
    //         uenc: '',
    //         hiddenInputs: {}
    //     }
    // }

    // // For more information on the shape of the expected data, see ../../products/types
    // dispatch(receiveCurrentProductId(id))
    // dispatch(receiveProductDetailsProductData(exampleData))
    // dispatch(receiveProductDetailsUIData(exampleUIData))
    // dispatch(receiveFormInfo(exampleFormData))
    // return Promise.resolve()
}

export const getProductVariantData = (variationSelections, variants, categoryIds) => (dispatch) => {
    console.log('[Stub Connector] Called getProductVariantData stub with arguments:', variationSelections, variants, categoryIds)
    return Promise.resolve()
}
