/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {getProductInitialValues, getProductAvailability} from 'progressive-web-sdk/dist/store/products/selectors'
import * as actions from '../actions'

import ProductDetailsVariations from './product-details-variations'
import Button from 'progressive-web-sdk/dist/components/button'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Stepper from 'progressive-web-sdk/dist/components/stepper'
import Share from 'progressive-web-sdk/dist/components/share'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {ADD_TO_CART_FORM_NAME} from '../../../store/form/constants'

// @TODO: Add correct analytics names to share

const openShareButton = (
    <Button
        icon="share"
        title="Share"
        iconClassName="u-margin-end"
        showIconText={true}
        className="u-color-brand u-text-letter-spacing-normal u-width-full"
        data-analytics-name={UI_NAME.share}
        type="button"
    />
)

const shareHeaderContent = (dismissShareModal) => (
    <div className="u-flex-none u-border-bottom">
        <div className="u-flexbox u-align-center">
            <h1 className="u-flex u-padding-lg u-h4">
                Share via
            </h1>

            <div className="u-flexbox u-flex-none u-align-center u-justify-center">
                <Button
                    className="u-text-uppercase"
                    onClick={dismissShareModal}
                    data-analytics-name={UI_NAME.dismissModal}
                >
                    <Icon name="close" title="Close" />
                </Button>
            </div>
        </div>
    </div>
)

const ProductDetailsAddToCart = ({
    available,
    quantity,
    setQuantity,
    onSubmit,
    disabled,
    isInCheckout,
    isShareOpen,
    isInWishlist,
    error,
    handleSubmit,
    addToWishlist,
    updateWishlistItem,
    setOpenShare
}) => {
    const stepperProps = {
        decrementIcon: 'minus',
        disabled,
        incrementIcon: 'plus',
        initialValue: quantity,
        minimumValue: 1,
        onChange: setQuantity,
        className: 'u-flex-none'
    }

    return (
        <form id={ADD_TO_CART_FORM_NAME} data-analytics-name={UI_NAME.addToCart} onSubmit={handleSubmit(onSubmit)}>
            <ProductDetailsVariations error={error} />

            <div className="u-margin-top-lg u-padding-start-md u-padding-end-md">
                <label htmlFor="quantity">Quantity</label>

                <div className="u-flexbox u-margin-bottom-lg u-margin-top">
                    {quantity > 0 &&
                        <Stepper {...stepperProps} />
                    }

                    <div className={`t-product-details__indicator u-border ${available ? 'u-margin-start' : ''} u-padding-md  u-flex u-flexbox u-justify-center`}>
                        <Icon name={available ? 'check' : 'close'} className="u-margin-end-sm" />
                        {available ? 'In stock' : 'Out of stock'}
                    </div>
                </div>
            </div>

            {/* Note that the "Update Cart" feature doesn't actually do that.. */}
            {available &&
                <div className="u-padding-start-md u-padding-end-md">
                    <Button
                        type="submit"
                        icon="plus"
                        iconClassName="pw--small u-margin-end"
                        title={isInCheckout ? 'Update Cart' : 'Add to Cart'}
                        showIconText={true}
                        className="pw--primary u-width-full u-text-uppercase t-product-details__add-to-cart"
                        disabled={disabled}
                        data-analytics-name={UI_NAME.addToCart}
                    />
                </div>
            }
            <div className="u-flexbox u-border-light-top u-border-light-bottom u-margin-top-md">
                <Button
                    icon="wishlist-add"
                    title={isInWishlist ? 'Update in Wishlist' : 'Wishlist'}
                    iconClassName="u-margin-end"
                    showIconText={true}
                    className="u-flex u-border-light-end u-color-brand u-text-letter-spacing-normal u-width-full"
                    onClick={() => {
                        if (isInWishlist) {
                            return updateWishlistItem(quantity)
                        }
                        return addToWishlist(quantity)
                    }}
                    data-analytics-name={UI_NAME.wishlist}
                />
                <Share
                    className="u-flex"
                    onShow={() => setOpenShare(true)}
                    onDismiss={() => setOpenShare(false)}
                    open={isShareOpen}
                    triggerElement={openShareButton}
                    headerContent={shareHeaderContent(() => setOpenShare(false))}
                    coverage="40%"
                />
            </div>
        </form>

    )
}

ProductDetailsAddToCart.propTypes = {
    setQuantity: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    addToWishlist: PropTypes.func,
    available: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.object,
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    isInCheckout: PropTypes.bool,
    isInWishlist: PropTypes.bool,
    isShareOpen: PropTypes.bool,
    quantity: PropTypes.number,
    setOpenShare: PropTypes.bool,
    updateWishlistItem: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    available: getProductAvailability,
    quantity: selectors.getItemQuantity,
    disabled: selectors.getAddToCartDisabled,
    initialValues: getProductInitialValues,
    isShareOpen: selectors.getIsShareOpen
})

const mapDispatchToProps = {
    setQuantity: actions.setItemQuantity,
    onSubmit: actions.submitCartForm,
    addToWishlist: actions.addToWishlist,
    updateWishlistItem: actions.updateItemInWishlist,
    setOpenShare: actions.setOpenShare,
}

const ProductDetailsAddToCartReduxForm = ReduxForm.reduxForm({
    form: ADD_TO_CART_FORM_NAME,
    enableReinitialize: true
})(ProductDetailsAddToCart)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsAddToCartReduxForm)
