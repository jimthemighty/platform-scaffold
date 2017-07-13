// /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
// /* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
// /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUser} from '../../store/selectors'
import {getProducts} from 'progressive-web-sdk/dist/store/products/selectors'

export const getIsLoggedIn = createGetSelector(getUser, 'isLoggedIn')

export const getUserCustomContent = createGetSelector(getUser, 'custom', Immutable.Map())

export const getWishlist = createGetSelector(getUser, 'wishlist', Immutable.Map())

export const getWishlistTitle = createGetSelector(getWishlist, 'title')

export const getWishlistProductIDs = createGetSelector(getWishlist, 'products', Immutable.List())

export const getWishlistProducts = createSelector(
    getWishlistProductIDs,
    getProducts,
    (wishlistItemIDs, products) => wishlistItemIDs.map((id) => products.get(id))
)

export const getWishlistItemCount = createSelector(getWishlistProductIDs, (products) => products.size)
