/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

// SDK Components
import Image from 'progressive-web-sdk/dist/components/image'

// Local Component
import ProductItem from '../../../components/product-item'

import {parsePrice} from '../../../utils/money-utils'

const PaymentProductItem = ({
    id,
    thumbnail,
    title,
    options,
    price,
    itemPrice,
    linePrice,
    quantity
}) => {
    const productImage = (
        <Image
            src={thumbnail.src}
            alt={thumbnail.alt}
            width="104px"
            height="104px"
        />
    )

    const linePriceValue = parsePrice(linePrice)
    const priceValue = parsePrice(price) * quantity
    const discount = linePriceValue < priceValue

    return (
        <ProductItem customWidth="20%"
            className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
            title={<h2 className="u-h5">{title}</h2>}
            image={productImage}
        >
            <div className="u-flexbox u-align-bottom">
                <div className="u-flex-none u-color-neutral-50 u-text-size-small">
                    {options && options.map(({label, value}, idx) => (
                        <p
                            className={idx > 0 ? 'u-margin-top-sm' : ''}
                            key={`${id}-option-${idx}`}
                        >
                            {label}: {value}
                        </p>
                    ))}

                    <p className={options > 0 ? 'u-margin-top-sm' : ''}>
                        Quantity: {quantity}
                    </p>
                </div>

                <div className="u-text-align-end u-flex">
                    {discount ?
                        <div>
                            <span className="u-h5 u-color-accent u-text-weight-semi-bold">{linePrice}</span>
                            <span className="u-text-quiet u-text-strikethrough u-padding-start">{price}</span>
                        </div>
                    :
                        <div className="u-h5 u-text-weight-semi-bold">
                            {linePrice}
                        </div>
                    }
                    <div className="u-text-quiet">
                        <em>{itemPrice} each</em>
                    </div>
                </div>
            </div>
        </ProductItem>
    )
}

PaymentProductItem.propTypes = {
    /**
     * Item ID
     */
    id: PropTypes.string,
    itemPrice: PropTypes.string,
    linePrice: PropTypes.string,

    /**
     * Product options
     */
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })),
    price: PropTypes.string,
    /**
     * Number of items
     */
    quantity: PropTypes.number,
    thumbnail: PropTypes.object,
    title: PropTypes.string
}

export default PaymentProductItem
