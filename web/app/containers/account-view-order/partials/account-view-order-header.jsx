/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import {getOrdersURL} from '../../app/selectors'
import {getCurrentOrderId} from '../../../store/user/orders/selectors'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'


const AccountViewOrderHeader = ({
    ordersURL,
    orderNumber
}) => (
    <div className="u-padding-top-lg u-padding-bottom-lg u-padding-start-md u-padding-end-md u-border-light-bottom">
        <div>
            <Breadcrumbs items={[{text: 'Back to Orders', href: ordersURL}]} />
        </div>
        <div className="u-margin-top-md">
            <h1 className="t-account-view-order__title">Order # {orderNumber ? orderNumber : <SkeletonText width="40%" style={{lineHeight: '32px'}} />}</h1>

        </div>
    </div>
)


AccountViewOrderHeader.propTypes = {
    orderNumber: PropTypes.string,
    ordersURL: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    orderNumber: getCurrentOrderId,
    ordersURL: getOrdersURL
})

export default connect(
    mapStateToProps
)(AccountViewOrderHeader)
