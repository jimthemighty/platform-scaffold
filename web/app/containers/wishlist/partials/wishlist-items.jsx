/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getWishlistProducts} from '../../../store/user/selectors'
import List from 'progressive-web-sdk/dist/components/list'
import Feedback from 'progressive-web-sdk/dist/components/feedback'
import Button from 'progressive-web-sdk/dist/components/button'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import ItemQuantityStepper from '../../../components/item-quantity-stepper'
import ItemPrice from '../../../components/item-price'
import ProductItem from '../../../components/product-item'
import ProductImage from '../../../components/product-image'
import NoWishlistItems from './no-wishlist-items'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

import {addToCartFromWishlist} from '../actions'

const AddToCartButton = ({addToCartFromWishlist, id, quantity}) => (
    <Button
        className="pw--primary u-width-full u-text-uppercase u-margin-top-md"
        text="Add To Cart"
        onClick={() => addToCartFromWishlist(id, quantity)}
        data-analytics-name={UI_NAME.addToCart}
    />
)

AddToCartButton.propTypes = {
    addToCartFromWishlist: PropTypes.func,
    id: PropTypes.string,
    quantity: PropTypes.Number
}

const OutOfStockMessage = () => (
    <Feedback isError icon="caution" isBlock title="out-of-stock" text="This item is out of stock." />
)

const WishlistItems = ({products, addToCartFromWishlist, productItemClassNames}) => (
    <List>
        {products.length ?
            products.map((product) => {
                const {id, thumbnail, title, quantity, price, available} = product
                const itemFooter = available ?
                    <AddToCartButton quantity={quantity} id={id} addToCartFromWishlist={addToCartFromWishlist} />
                    : <OutOfStockMessage />
                return (
                    <ProductItem
                        key={id}
                        customWidth="40%"
                        className={productItemClassNames}
                        title={<h2 className="u-h5 u-text-family u-text-weight-semi-bold">{title}</h2>}
                        image={<ProductImage {...thumbnail} />}
                        footerContent={itemFooter}
                    >
                        <FieldRow className="u-align-bottom">
                            <ItemQuantityStepper
                                cartItemId={id}
                                changeQuantity={this.changeQuantity}
                                quantity={quantity}
                            />

                            <ItemPrice linePrice={price} />
                        </FieldRow>

                        <div className="u-flexbox">
                            <Button
                                className="u-text-size-small u-color-brand u-flex-none u-text-letter-spacing-normal"
                                innerClassName="pw--no-min-width u-padding-start-0 u-padding-bottom-0"
                                href={'test/url'}
                                data-analytics-name={UI_NAME.editItem}
                                onClick={() => console.log('test edit button')}
                                >
                                Edit
                            </Button>
                            <Button
                                className="u-text-size-small u-color-brand u-text-letter-spacing-normal qa-cart__remove-item"
                                innerClassName="u-padding-end-0 u-padding-bottom-0 u-padding-start-0"
                                onClick={() => console.log('test remove button')}
                                data-analytics-name={UI_NAME.removeItem}
                                >
                                Remove
                            </Button>
                        </div>
                    </ProductItem>
                )
            })
        :
            <NoWishlistItems />
        }
    </List>
)

WishlistItems.propTypes = {
    addToCartFromWishlist: PropTypes.func,
    productItemClassNames: PropTypes.string,
    products: PropTypes.array
}




const mapStateToProps = createPropsSelector({
    products: getWishlistProducts
})

const mapDispatchToProps = {
    addToCartFromWishlist
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WishlistItems)
