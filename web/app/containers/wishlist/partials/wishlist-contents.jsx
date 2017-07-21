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
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import Icon from 'progressive-web-sdk/dist/components/icon'
import ItemQuantityStepper from '../../../components/item-quantity-stepper'
import ItemPrice from '../../../components/item-price'
import ProductItem from '../../../components/product-item'
import ProductImage from '../../../components/product-image'
import WishlistShareButton from './wishlist-share'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const productItemClassNames = 'u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top'

const ProductSkeleton = () => (
    <ProductItem
        className={productItemClassNames}
        title={<SkeletonText type="h3" className="u-margin-bottom-sm" />}
        image={<ProductImage src="null" alt="null" />}
        footerContent={
            <SkeletonBlock height="40px" width="100%" className="u-margin-top-md" />
        }
    >
        <SkeletonText width="60%" style={{lineHeight: '20px'}} />
        <SkeletonText width="60%" style={{lineHeight: '20px'}} className="u-margin-bottom-sm" />
    </ProductItem>
)

const WishlistItems = ({products}) => (
    <List>
        {products.length ?
            products.map((product) => {
                const {id, thumbnail, title, quantity, price} = product
                return (
                    <ProductItem
                        key={id}
                        customWidth="40%"
                        className={productItemClassNames}
                        title={<h2 className="u-h5 u-text-family u-text-weight-semi-bold">{title}</h2>}
                        image={<ProductImage {...thumbnail} />}
                        footerContent={
                            <Button
                                className="pw--primary u-width-full u-text-uppercase u-margin-top-md"
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
            <NoWishlistItems />
        }
    </List>
)

WishlistItems.propTypes = {
    products: PropTypes.array,
}

const NoWishlistItems = () => (
    <div className="t-wishlist__empty u-padding-md u-flexbox u-direction-column u-align-center u-justify-center">
        <Icon
            name="wishlist-add"
            className="u-color-brand"
            size="large"
        />
        <div className="u-text-align-center u-padding-lg">
            You have no items in your wishlist.
            Start adding items by browsing the product catalogue
        </div>
        <Button text="Continue Shopping" href="/" className="pw--tertiary u-width-full u-text-uppercase " />
    </div>
)

const WishlistContents = ({
    products,
    contentLoaded
}) => (
    <div className="u-padding-top-md u-bg-color-neutral-10">
        <div className="u-border-light-bottom u-bg-color-neutral-00">
            {contentLoaded ?
                <WishlistItems products={products} />
            :
                <ProductSkeleton />
            }
        </div>
        {products.length > 0 &&
            <WishlistShareButton />
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
