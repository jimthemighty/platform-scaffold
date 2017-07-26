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

export const getWishlistTitle = createGetSelector(getWishlist, 'title', 'My Wish List')

export const getWishlistID = createGetSelector(getWishlist, 'id', '')

export const getWishlistShareURL = createGetSelector(getWishlist, 'shareURL')

export const getWishlistItems = createGetSelector(getWishlist, 'products', Immutable.List())

export const getWishlistProducts = createSelector(
    getWishlistItems,
    getProducts,
    (wishlistItems, products) => wishlistItems.map((wishlistItem) => {
        const productData = products.get(wishlistItem.get('productId'))
        if (productData) {
            return productData.mergeDeep(wishlistItem)
        }
        return Immutable.Map()
    })
)

export const getWishlistItemCount = createSelector(getWishlistItems, (products) => products.size)
