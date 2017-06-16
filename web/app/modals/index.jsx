/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getModals} from 'progressive-web-sdk/dist/store/modals/selectors'

import * as MODAL from './constants'
import Navigation from '../containers/navigation/container'
import MiniCart from './mini-cart/container'
import ProductDetailsItemAddedModal from './product-details-item-added-modal'
import CartEstimateShippingModal from './cart-estimate-shipping'
import CartWishlistModal from './cart-wishlist'
import CartRemoveItemModal from './cart-remove-item'
import CheckoutConfirmationModal from './checkout-confirmation-modal'
import RememberMeModal from './remember-me-modal'
import OfflineModal from './offline-modal'
import ProductListFilterModal from './product-list-filter-modal'

const modals = {
    [MODAL.NAVIGATION_MODAL]: <Navigation />,
    // [MODAL.OFFLINE_MODAL]: <OfflineModal />,
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
    const {reload, isOpen} = props
    let openedModal
    for (const modal in isOpen) {
        if (isOpen[modal]) {
            openedModal = modals[modal]
        }
    }

    return (
        <div className="m-modal-manager">
            <OfflineModal reload={reload} />
            {openedModal}
        </div>
    )
}

ModalManager.propTypes = {
    isOpen: PropTypes.object,
    reload: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    isOpen: getModals
})

export default connect(
    mapStateToProps
)(ModalManager)
