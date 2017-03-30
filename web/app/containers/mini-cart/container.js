import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Image from 'progressive-web-sdk/dist/components/image'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {MINI_CART_MODAL} from './constants'
import {stripEvent} from '../../utils/utils'
import {getCartContentsLoaded, getCartHasItems} from '../../store/cart/selectors'
import {getCheckoutURL} from '../app/selectors'

import MiniCartHeader from './partials/mini-cart-header'
import MiniCartProductList from './partials/mini-cart-product-list'

const MiniCartEmpty = () => (
    <div className="t-mini-cart__empty-content u-flexbox u-flex u-column">
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

const MiniCartMain = ({hasItems, closeMiniCart, checkoutURL}) => {
    const buttonClasses = 'c--primary u-width-full u-text-uppercase'

    return (
        <div className="t-mini-cart__content u-flexbox u-column u-padding-md">
            {hasItems ? <MiniCartProductList /> : <MiniCartEmpty />}

            <div className="u-padding-top-lg u-flex-none">
                {hasItems ?
                    <Button href={checkoutURL} className={buttonClasses}>
                        Go To Checkout
                    </Button>
                :
                    <Button onClick={closeMiniCart} className={buttonClasses}>
                        Continue Shopping
                    </Button>
                }
            </div>
        </div>
    )
}

MiniCartMain.propTypes = {
    checkoutURL: PropTypes.string,
    closeMiniCart: PropTypes.func,
    hasItems: PropTypes.bool
}


const MiniCart = ({hasItems, contentsLoaded, isOpen, closeMiniCart, checkoutURL}) => {
    return (
        <Sheet className="t-mini-cart" open={isOpen} onDismiss={closeMiniCart} maskOpacity={0.7} effect="slide-right" coverage="85%">
            <MiniCartHeader closeMiniCart={closeMiniCart} />

            {contentsLoaded && <MiniCartMain hasItems={hasItems} closeMiniCart={closeMiniCart} checkoutURL={checkoutURL} />}
        </Sheet>
    )
}

MiniCart.propTypes = {
    checkoutURL: PropTypes.string,
    closeMiniCart: PropTypes.func,
    contentsLoaded: PropTypes.bool,
    getCart: PropTypes.func,
    hasItems: PropTypes.bool,
    isOpen: PropTypes.bool,
}

const mapStateToProps = createPropsSelector({
    checkoutURL: getCheckoutURL,
    contentsLoaded: getCartContentsLoaded,
    isOpen: isModalOpen(MINI_CART_MODAL),
    hasItems: getCartHasItems
})

const mapDispatchToProps = {
    closeMiniCart: stripEvent(() => closeModal(MINI_CART_MODAL))
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MiniCart)
