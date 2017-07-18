/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import Stepper from 'progressive-web-sdk/dist/components/stepper'
import Field from 'progressive-web-sdk/dist/components/field'

/**
 * INSERT_DESCRIPTION_HERE
 */

const ItemQuantityStepper = ({
    cartItemId,
    quantity,
    changeQuantity,
    className
}) => {
    return (
        <Field label="Quantity" idFor={`quantity-${cartItemId}`} className={className}>
            <Stepper
                className="pw--simple t-cart__product-stepper"
                idForLabel={`quantity-${cartItemId}`}
                incrementIcon="plus"
                decrementIcon="minus"
                initialValue={quantity}
                minimumValue={1}
                onChange={changeQuantity}
                />
        </Field>
    )
}


ItemQuantityStepper.propTypes = {
    cartItemId: PropTypes.string,
    changeQuantity: PropTypes.func,
    className: PropTypes.string,
    quantity: PropTypes.number

}

export default ItemQuantityStepper
