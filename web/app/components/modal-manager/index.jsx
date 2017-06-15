/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getModals} from 'progressive-web-sdk/dist/store/modals/selectors'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'

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

class ModalManager extends React.Component {
    constructor(props) {
        super(props)

        this.renderOpenedModal = this.renderOpenedModal.bind(this)
    }

    componentWillMount() {
        // register all modals in redux store, isOpen is initialized to false for all modals
        // probably will move this to sdk, action: regitserModals()

        // Object.keys(modals).forEach((modal) => {
        //    this.props.close(modal)
        // })
    }

    renderOpenedModal() {
        const {isOpen} = this.props
        let openedModal
        for (const modal in isOpen) {
            if (isOpen[modal]) {
                openedModal = modals[modal]
            }
        }
        return openedModal
    }

    render() {
        const {history, reload} = this.props
        const openedModal = this.renderOpenedModal()
        return (
            <div>
                <Navigation history={history} />
                <OfflineModal reload={reload} />
                {openedModal}
            </div>
        )
    }
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

const mapDispatchToProps = {
    close: (modal) => closeModal(modal)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalManager)
