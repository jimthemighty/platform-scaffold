/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getContentLoaded} from '../selectors'
import {getWishlistProducts} from '../../../store/user/selectors'
import List from 'progressive-web-sdk/dist/components/list'
import Button from 'progressive-web-sdk/dist/components/button'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import Icon from 'progressive-web-sdk/dist/components/icon'
import ItemQuantityStepper from '../../../components/item-quantity-stepper'
import ItemPrice from '../../../components/item-price'
import ProductItem from '../../../components/product-item'
import ProductImage from '../../../components/product-image'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const WishlistItems = ({products}) => (
    <List className="pw--borderless">
        {products.length ?
            products.map((product) => {
                const {id, thumbnail, title, quantity, price} = product
                return (
                    <ProductItem
                        key={id}
                        customWidth="40%"
                        title={<h2 className="u-h5 u-text-family u-text-weight-semi-bold">{title}</h2>}
                        image={<ProductImage {...thumbnail} />}
                        footerContent={
                            <Button
                                className="pw--primary u-width-full u-text-uppercase u-margin-bottom-lg"
                                text="Add To Cart"
                                onClick={() => { console.log('ADD TO CART CLICKED') }}
                                data-analytics-name={UI_NAME.addToCart}
                            />
                        }
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
            <SkeletonBlock height="60px" />
        }
    </List>
)

WishlistItems.propTypes = {
    products: PropTypes.array,
}

const NoWishlistItems = () => (
    <div className="u-flexbox u-direction-column u-align-center">
        <Icon
            title="wishlist-add"
            className="u-flex-none"
            alt="Empty Wishlist"
            width="122px"
            height="110px"
        />

        <div className=" u-text-align-center">
            You have no items in your wishlist.
            Start adding items by browsing the product catalogue
        </div>
        <Button text="Continue Shopping" href="/" className="u-width-full" />
    </div>
)


const WishlistContents = ({
    products,
    contentLoaded
}) => (
    <div>
        {contentLoaded ?
            <WishlistItems products={products} />
        :
            <NoWishlistItems />
        }
    </div>
)


WishlistContents.propTypes = {
    contentLoaded: PropTypes.bool,
    products: PropTypes.array,
}

const mapStateToProps = createPropsSelector({
    contentLoaded: getContentLoaded,
    products: getWishlistProducts
})

export default connect(
    mapStateToProps
)(WishlistContents)
