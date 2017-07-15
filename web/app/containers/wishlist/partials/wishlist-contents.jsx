/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getWishlistProducts} from '../../../store/user/selectors'
import List from 'progressive-web-sdk/dist/components/list'
import Button from 'progressive-web-sdk/dist/components/button'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import ItemQuantityStepper from '../../../components/item-quantity-stepper'
import ItemPrice from '../../../components/item-price'
import ProductItem from '../../../components/product-item'
import ProductImage from '../../../components/product-image'
import ProductSkeleton from '../../../components/product-skeleton'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'


const WishlistContents = ({
    products
}) => (
    <div>
        <List className="pw--borderless">
            {products.map((product, idx) => {
                if (product) {
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
                }

                return (
                    <ProductSkeleton
                        productItemClassNames="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
                        key={idx}
                    />
                )

            })}
        </List>
    </div>
)


WishlistContents.propTypes = {
    products: PropTypes.array,
}

const mapStateToProps = createPropsSelector({
    products: getWishlistProducts,
})

export default connect(
    mapStateToProps
)(WishlistContents)
