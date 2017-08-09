/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import AddressBlock from '../../../components/address-block'
import Card from '../../../components/card'

import {
    getOrderPaymentMethods,
    getOrderBillingAddress,
    getOrderShippingAddress,
    getOrderShippingMethod
} from '../../../store/user/orders/selectors'

const OrderInformation = ({
    billingAddress,
    paymentMethods,
    shippingAddress,
    shippingMethod
}) => (
    <div className="">
        <Card className="c--border" header="Shipping Address">
            <AddressBlock {...shippingAddress} />
        </Card>
        <Card className="c--border" header="Shipping Method">
            {shippingMethod}
        </Card>
        <Card className="c--border" header="Billing Address">
            <AddressBlock {...billingAddress} />
        </Card>
        <Card className="c--border" header="Payment Method">
            {paymentMethods && paymentMethods.map((paymentMethod) => paymentMethod)}
        </Card>
    </div>
)


OrderInformation.propTypes = {
    billingAddress: PropTypes.object,
    paymentMethods: PropTypes.arrayOf(PropTypes.string),
    shippingAddress: PropTypes.object,
    shippingMethod: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    billingAddress: getOrderBillingAddress,
    paymentMethods: getOrderPaymentMethods,
    shippingAddress: getOrderShippingAddress,
    shippingMethod: getOrderShippingMethod
})

export default connect(
    mapStateToProps
)(OrderInformation)
