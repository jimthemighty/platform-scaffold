/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import template from '../../template'
import {createPropsSelector} from 'reselect-immutable-helpers'
import AccountViewOrderHeader from './partials/account-view-order-header'
import OrderTotals from './partials/order-totals'

import {getTitle} from './selectors'

const AccountViewOrder = () => (
    <div className="t-account-view-order">
        <AccountViewOrderHeader />

        <h3>Items Ordered</h3>
        <OrderTotals />
        <h3>Order Information</h3>

    </div>
)

AccountViewOrder.propTypes = {
}

const mapStateToProps = createPropsSelector({
    title: getTitle
})

const mapDispatchToProps = {}

export default template(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountViewOrder)
)
