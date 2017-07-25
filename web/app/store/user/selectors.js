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


const PLACEHOLDER = {
    text: undefined
}

export const getAllAddresses = createGetSelector(getUser, 'addresses', Immutable.List())

export const getDefaultAddress = createSelector(getUser, (user) => {
    const addresses = user.get('addresses')
    return addresses ? addresses.toJS().find((address) => address.default) : Immutable.Map()
})

export const getAddresses = createSelector(getUser, (user) => {
    const addresses = user.get('addresses')
    return addresses ? addresses.toJS().filter((address) => !address.default) : Immutable.List(new Array(5).fill(PLACEHOLDER))
})

export const getWishlist = createGetSelector(getUser, 'wishlist', Immutable.Map())

export const getWishlistTitle = createGetSelector(getWishlist, 'title', 'My Wish List')

export const getWishlistShareURL = createGetSelector(getWishlist, 'shareURL')

export const getWishlistItems = createGetSelector(getWishlist, 'products', Immutable.List())

export const getWishlistProducts = createSelector(
    getWishlistItems,
    getProducts,
    (wishlistItems, products) => wishlistItems.map((wishlistItem) => {
        const productData = products.get(wishlistItem.get('id'))
        if (productData) {
            return productData.set('quantity', wishlistItem.get('quantity'))
        }
        return Immutable.Map()
    })
)

export const getWishlistItemCount = createSelector(getWishlistItems, (products) => products.size)
