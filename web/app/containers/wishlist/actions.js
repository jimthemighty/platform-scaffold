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

export const receiveWishlistItemQuantity = createAction('Receive Wishlist Item Quantity', ['itemQuantity'])

export const addToCartFromWishlist = (itemID, quantity) => (dispatch) => {
    dispatch(receiveCurrentProductId(itemID))
    dispatch(receiveWishlistItemQuantity(quantity))
    return dispatch(addToCartFromWishlistCommand({itemID, quantity}))
        .then(() => dispatch(openModal(WISHLIST_ITEM_ADDED_MODAL, UI_NAME.addToCart)))
        .catch((error) => {
            debugger
            return dispatch(addNotification(
                'addToCartWishlistError',
                'Unable to add item to the cart.',
                true
            ))
        })
}


export const goToCheckout = () => (dispatch) => {
    dispatch(closeModal(WISHLIST_ITEM_ADDED_MODAL, UI_NAME.addToCart))
    dispatch(appActions.goToCheckout())
}