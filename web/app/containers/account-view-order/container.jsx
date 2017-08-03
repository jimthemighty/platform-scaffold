/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import template from '../../template'
import {createPropsSelector} from 'reselect-immutable-helpers'
import AccountViewOrderHeader from './partials/account-view-order-header'
import OrderTotals from './partials/order-totals'
import OrderItems from './partials/order-items'
import OrderInformation from './partials/order-information'
import ReorderButton from './partials/reorder-button'
import PrintButton from './partials/print-button'


const AccountViewOrder = () => (
    <div className="t-account-view-order">
        <AccountViewOrderHeader />
        <h3>Items Ordered</h3>
        <OrderItems />
        <OrderTotals />
        <ReorderButton />
        <h3>Order Information</h3>
        <OrderInformation />
        <PrintButton />
    </div>
)

export default template(AccountViewOrder)
