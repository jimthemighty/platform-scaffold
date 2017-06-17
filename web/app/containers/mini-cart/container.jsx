/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Image from 'progressive-web-sdk/dist/components/image'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {MINI_CART_MODAL, MINI_CART_CONTENT_CLASSES} from './constants'
import {stripEvent} from '../../utils/utils'
import {getCartLoaded, getCartHasItems} from '../../store/cart/selectors'
import {getCheckoutShippingURL} from '../app/selectors'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {requestCartContent} from './actions'

import MiniCartHeader from './partials/mini-cart-header'
import MiniCartProductList, {PlaceholderMiniCart} from './partials/mini-cart-product-list'

const MiniCartEmpty = () => (
    <div className="t-mini-cart__empty-content u-flexbox u-flex u-direction-column">
        <Image
            className="u-margin-bottom-md"
            height="140px"
            width="140px"
            alt="Illustrated upside-down top hat with a bug flying out"
            src={getAssetUrl(`static/img/cart/empty-cart@2x.png`)} />

        <p className="t-mini-cart__empty-message u-text-align-center">
            You have no items in your shopping cart.
        </p>
    </div>
)

const MiniCartMain = ({hasItems, closeMiniCart, checkoutShippingURL}) => {
    const buttonClasses = 'c--primary u-width-full u-text-uppercase'

    return (
        <div className={MINI_CART_CONTENT_CLASSES}>
            {hasItems ? <MiniCartProductList /> : <MiniCartEmpty />}

            <div className="u-padding-top-lg u-flex-none">
                {hasItems ?
                    <Button
                        href={checkoutShippingURL}
                        className={buttonClasses}
                        data-analytics-name={UI_NAME.checkout}
                    >
                        Go To Checkout
                    </Button>
                :
                    <Button
                        onClick={closeMiniCart}
                        className={buttonClasses}
                        data-analytics-name={UI_NAME.continueShopping}
                    >
                        Continue Shopping
                    </Button>
                }
            </div>
        </div>
    )
}

MiniCartMain.propTypes = {
    checkoutShippingURL: PropTypes.string,
    closeMiniCart: PropTypes.func,
    hasItems: PropTypes.bool
}


class MiniCart extends React.Component {
    constructor(props) {
        super(props)

        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        this.props.requestCartContent()
        window.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        const {
            hasItems,
            cartLoaded,
            isOpen,
            closeMiniCart,
            checkoutShippingURL
        } = this.props

        return (
            <Sheet
                className="t-mini-cart"
                open={isOpen}
                onDismiss={closeMiniCart}
                maskOpacity={0.7}
                effect="slide-right"
                coverage="85%"
            >
                <MiniCartHeader closeMiniCart={closeMiniCart} />

                {cartLoaded ?
                    <MiniCartMain
                        hasItems={hasItems}
                        closeMiniCart={closeMiniCart}
                        checkoutShippingURL={checkoutShippingURL}
                    />
                :
                    <div className={MINI_CART_CONTENT_CLASSES}>
                        <PlaceholderMiniCart />
                    </div>
                }
            </Sheet>
        )
    }
}

MiniCart.propTypes = {
    cartLoaded: PropTypes.bool,
    checkoutShippingURL: PropTypes.string,
    closeMiniCart: PropTypes.func,
    hasItems: PropTypes.bool,
    isOpen: PropTypes.bool,
    requestCartContent: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    checkoutShippingURL: getCheckoutShippingURL,
    cartLoaded: getCartLoaded,
    isOpen: isModalOpen(MINI_CART_MODAL),
    hasItems: getCartHasItems
})

const mapDispatchToProps = {
<<<<<<< HEAD
    closeMiniCart: stripEvent(() => closeModal(MINI_CART_MODAL, UI_NAME.miniCart))
=======
    closeMiniCart: stripEvent(() => closeModal(MINI_CART_MODAL)),
    requestCartContent
>>>>>>> origin/develop
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MiniCart)
