/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'



const OrderTotals = ({
    subtotal,
    shipping,
    tax,
    total
}) => (
    <div className="">
        <Ledger>

            <LedgerRow
                className="u-border-0"
                label="Subtotal"
                value={subtotal}
            />
            <LedgerRow
                className="u-border-0"
                label="Shipping & Handling"
                value={shipping}
            />
            <LedgerRow
                className="u-border-0"
                label="Tax"
                value={tax}

            />
            <LedgerRow
                className="u-border-0"
                label="Total"
                isTotal={true}
                value={total}
            />
        </Ledger>
    </div>
)


OrderTotals.propTypes = {
    orderNumber: PropTypes.string,
    ordersURL: PropTypes.string
}

const mapStateToProps = createPropsSelector({
})

export default connect(
    mapStateToProps
)(OrderTotals)
