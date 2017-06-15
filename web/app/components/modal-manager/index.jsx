/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getModals} from 'progressive-web-sdk/dist/store/modals/selectors'

import * as MODAL from './constants'
import Navigation from '../../containers/navigation/container'
import MiniCart from '../../containers/mini-cart/container'
import ProductDetailsItemAddedModal from '../../containers/product-details/partials/product-details-item-added-modal'
import CartEstimateShippingModal from '../../containers/cart/partials/cart-estimate-shipping'
import CartWishlistModal from '../../containers/cart/partials/cart-wishlist'
import CartRemoveItemModal from '../../containers/cart/partials/cart-remove-item'
import CheckoutConfirmationModal from '../../containers/checkout-confirmation/partials/checkout-confirmation-modal'
import RememberMeModal from '../../containers/login/partials/remember-me-modal'
import OfflineModal from '../../containers/offline/partials/offline-modal'
import ProductListFilterModal from '../../containers/product-list/partials/product-list-filter-modal'

const modals = {
    // [MODAL.NAVIGATION_MODAL]: <Navigation />
    // [MODAL.OFFLINE_MODAL]: <OfflineModal />
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
    const {history, reload, isOpen} = props
    let openedModal
    for (const modal in isOpen) {
        if (isOpen[modal]) {
            openedModal = modals[modal]
        }
    }

    return (
        <div>
            <Navigation history={history} />
            <OfflineModal reload={reload} />
            {openedModal}
        </div>
    )
}

ModalManager.propTypes = {
    close: PropTypes.func,
    history: PropTypes.object,
    isOpen: PropTypes.object,
    reload: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    isOpen: getModals
})

export default connect(
    mapStateToProps
)(ModalManager)
