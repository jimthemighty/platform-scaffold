/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classnames from 'classnames'
import Field from 'progressive-web-sdk/dist/components/field'

/**
 * Displays the price for an item
 * Accepts both the linePrice and itemPrice
 */

const ItemPrice = ({
    linePrice,
    itemPrice,
    className,
    quantity,
    originalPrice
}) => {
    const wrapperClass = classnames(className, 'c-item-price')

    const linePriceValue = parseFloat(linePrice.substring(1))
    const priceValue = parseFloat(originalPrice.substring(1)) * quantity
    const discount = linePriceValue < priceValue

    return (
        <Field className={wrapperClass}>
            <div className="u-text-align-end u-flex">
                {discount ?
                    <div>
                        <span className="u-h5 u-color-accent u-text-weight-bold">{linePrice}</span>
                        <span className="u-text-quiet u-text-strikethrough u-padding-start">{`$${priceValue}`}</span>
                    </div>
                :
                    <div className="u-h5 u-color-accent u-text-weight-bold">{linePrice}</div>
                }
                {itemPrice &&
                    <div className="u-text-quiet"><em>{itemPrice} each</em></div>
                }
            </div>
        </Field>
    )
}


ItemPrice.propTypes = {
    className: PropTypes.string,
    /**
     * The Unit price for the line item
     */
    itemPrice: PropTypes.string,
    /**
     * The full price for the line item (unit price * quantity)
    */
    linePrice: PropTypes.string,
    /**
     * The original unit price for the item
    */
    originalPrice: PropTypes.string,
    /**
     * The quantity of this item
    */
    quantity: PropTypes.number,
}

export default ItemPrice
