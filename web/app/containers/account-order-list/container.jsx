/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import template from '../../template'
import {createPropsSelector} from 'reselect-immutable-helpers'
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import {getAccountURL} from '../app/selectors'


const AccountOrderList = ({dashboardURL}) => (
    <div className="t-account-order-list">
        <div className="t-account-order-list__headings u-padding-top-lg u-padding-bottom-lg u-padding-start-md u-padding-end-md">
            <div className="t-account-order-list__breadcrumb">
                <Breadcrumbs items={[{text: 'Back to Dashboard', href: dashboardURL}]} />
            </div>
            <div className="u-margin-top-md">
                <h1 className="t-account-order-list__title u-text-uppercase u-width-1of2">My Orders</h1>
            </div>
        </div>
    </div>
)

AccountOrderList.propTypes = {
    dashboardURL: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    dashboardURL: getAccountURL
})

const mapDispatchToProps = {}

export default template(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountOrderList)
)
