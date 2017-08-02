/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import AddressBlock from '../../../components/address-block'
import Card from '../../../components/card'

import {
    getOrderPaymentMethod,
    getOrderBillingAddress,
    getOrderShippingAddress,
    getOrderShippingMethod
} from '../../../store/user/orders/selectors'

const OrderInformation = ({
    billingAddress,
    paymentMethod,
    shippingAddress,
    shippingMethod
}) => (
    <div className="">
        <Card className="c--border" header="Shipping Address">
            <AddressBlock {...shippingAddress} countryId={shippingAddress && shippingAddress.country} />
        </Card>
        <Card className="c--border" header="Shipping Method">
            {shippingMethod}
        </Card>
        <Card className="c--border" header="Billing Address">
            <AddressBlock {...billingAddress} countryId={billingAddress && billingAddress.country} />
        </Card>
        <Card className="c--border" header="Payment Method">
            {paymentMethod}
        </Card>
    </div>
)


OrderInformation.propTypes = {
    billingAddress: PropTypes.string,
    paymentMethod: PropTypes.string,
    shippingAddress: PropTypes.string,
    shippingMethod: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    billingAddress: getOrderBillingAddress,
    paymentMethod: getOrderPaymentMethod,
    shippingAddress: getOrderShippingAddress,
    shippingMethod: getOrderShippingMethod
})

export default connect(
    mapStateToProps
)(OrderInformation)
