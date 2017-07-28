/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {
    addToCartFromWishlist as addToCartFromWishlistCommand
} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {addNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import {WISHLIST_ITEM_ADDED_MODAL} from '../../modals/constants'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {openModal, closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import * as appActions from '../app/actions'
import {receiveCurrentProductId} from 'progressive-web-sdk/dist/integration-manager/results'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {getWishlistID} from '../../store/user/selectors'

export const receiveWishlistItemQuantity = createAction('Receive Wishlist Item Quantity', ['itemQuantity'])

export const addToCartFromWishlist = (productId, quantity, itemID) => (dispatch, getState) => {
    const wishlistID = getWishlistID(getState())
    dispatch(receiveCurrentProductId(productId))
    dispatch(receiveWishlistItemQuantity(quantity))
    return dispatch(addToCartFromWishlistCommand({productId, quantity, wishlistID, itemID}))
        .then(() => dispatch(openModal(WISHLIST_ITEM_ADDED_MODAL, UI_NAME.wishlist)))
        .catch(({message}) => {
            if (message.test(/redirect/i)) {
                return
            }
            dispatch(addNotification(
                'addToCartWishlistError',
                'Unable to add item to the cart.',
                true
            ))
        })
}


export const goToCheckout = () => (dispatch) => {
    dispatch(closeModal(WISHLIST_ITEM_ADDED_MODAL, UI_NAME.wishlist))
    dispatch(appActions.goToCheckout())
}
