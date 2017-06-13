/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'

import {getProducts} from '../selectors'
import {getApp} from '../../containers/app/selectors'

export const getCurrentProductId = createGetSelector(getApp, 'currentProduct')

export const getCurrentProduct = createGetSelector(getProducts, getCurrentProductId, Immutable.Map())
export const getProductTitle = createGetSelector(getCurrentProduct, 'title')
export const getProductPrice = createGetSelector(getCurrentProduct, 'price')
export const getProductDescription = createGetSelector(getCurrentProduct, 'description')
export const getProductImages = createGetSelector(getCurrentProduct, 'images', Immutable.List())
export const getProductThumbnail = createGetSelector(getCurrentProduct, 'thumbnail', Immutable.Map())
export const getProductAvailability = createGetSelector(getCurrentProduct, 'available')
export const getProductCustomContent = createGetSelector(getCurrentProduct, 'custom')

export const getProductVariationCategories = createGetSelector(getCurrentProduct, 'variationCategories', Immutable.List())

export const getProductVariationCategoryIds = createSelector(
    getProductVariationCategories,
    (categories) => categories.map((category) => category.get('id'))
)
export const getProductVariants = createGetSelector(getCurrentProduct, 'variants')
export const getProductInitialValues = createGetSelector(getCurrentProduct, 'initialValues')

export const getProductById = (productId) => createGetSelector(getProducts, productId, Immutable.Map())
export const getProductThumbnailById = (id) => createGetSelector(getProductById(id), 'thumbnail', Immutable.Map())
export const getProductThumbnailSrcById = (id) => createGetSelector(getProductById(id), 'img')
