/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getModals} from 'progressive-web-sdk/dist/store/modals/selectors'

import * as MODAL from './constants'
import Navigation from './navigation/container'
import MiniCart from './mini-cart/container'
import ProductDetailsItemAddedModal from './product-details-item-added/container'
import CartEstimateShippingModal from './cart-estimate-shipping/container'
import CartWishlistModal from './cart-wishlist/container'
import CartRemoveItemModal from './cart-remove-item/container'
import CheckoutConfirmationModal from './checkout-confirmation/container'
import RememberMeModal from './remember-me/container'
import OfflineModal from './offline/container'
import ProductListFilterModal from './product-list-filter/container'

const modals = {
    [MODAL.NAVIGATION_MODAL]: <Navigation />,
    [MODAL.OFFLINE_MODAL]: <OfflineModal />,
    [MODAL.MINI_CART_MODAL]: <MiniCart />,
    [MODAL.PRODUCT_DETAILS_ITEM_ADDED_MODAL]: <ProductDetailsItemAddedModal />,
    [MODAL.PRODUCT_LIST_FILTER_MODAL]: <ProductListFilterModal />,
    [MODAL.CART_ESTIMATE_SHIPPING_MODAL]: <CartEstimateShippingModal />,
    [MODAL.CART_WISHLIST_MODAL]: <CartWishlistModal />,
    [MODAL.CART_REMOVE_ITEM_MODAL]: <CartRemoveItemModal />,
    [MODAL.CHECKOUT_CONFIRMATION_MODAL]: <CheckoutConfirmationModal />,
    [MODAL.REMEMBER_ME_MODAL]: <RememberMeModal />
}

const ModalManager = (props) => {
    const {isOpen} = props
    let openedModal
    for (const modal in isOpen) {
        if (isOpen[modal]) {
            openedModal = modals[modal]
        }
    }

    return (
        <div className="m-modal-manager">
            {openedModal}
        </div>
    )
}

ModalManager.propTypes = {
    isOpen: PropTypes.object
}

const mapStateToProps = createPropsSelector({
    isOpen: getModals
})

export default connect(
    mapStateToProps
)(ModalManager)
