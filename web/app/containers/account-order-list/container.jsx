/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import template from '../../template'
import {createPropsSelector} from 'reselect-immutable-helpers'
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import {getAccountURL} from '../app/selectors'
import Card from '../../components/card'
import Button from 'progressive-web-sdk/dist/components/button'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {getOrderList} from './selectors'
import {reorderItems} from './actions'

const AccountOrderList = ({reorderItems, dashboardURL, orders}) => {
    return (
        <div className="t-account-order-list">
            <div className="t-account-order-list__headings u-padding-top-lg u-padding-bottom-lg u-padding-start-md u-padding-end-md">
                <div className="t-account-order-list__breadcrumb">
                    <Breadcrumbs items={[{text: 'Back to Dashboard', href: dashboardURL}]} />
                </div>
                <div className="u-margin-top-md">
                    <h1 className="t-account-order-list__title u-text-uppercase u-width-1of2">My Orders</h1>
                </div>
            </div>
            <div className="t-account-order-list__content u-padding-md">
                {orders.map(({id, orderNumber, status, total, date}) => (
                    <Card
                        hasBorder
                        key={id}
                        header={
                            <h3 className="u-padding-top-md u-padding-start-md u-padding-end-md">{orderNumber}</h3>
                        }
                        children={
                            <div className="u-padding-md">
                                <p>
                                    <strong>Date: </strong>
                                    {date}
                                </p>
                                <p>
                                    <strong>Total: </strong>
                                    {total}
                                </p>
                                <p>
                                    <strong>Status: </strong>
                                    {status}
                                </p>
                            </div>
                        }
                        footer={
                            <div className="u-flexbox">
                                <div className="u-flex u-border-end">
                                    <Button
                                        type="button"
                                        title="View"
                                        className="u-width-full u-color-brand u-border-top"
                                        icon="review"
                                        showIconText={true}
                                        iconClassName="u-margin-end"
                                        data-analytics-name={UI_NAME.view}
                                    />
                                </div>
                                <div className="u-flex">
                                    <Button
                                        type="button"
                                        title="Reorder"
                                        className="u-width-full u-color-brand u-border-top"
                                        icon="cart-v2"
                                        onClick={() => reorderItems(id || orderNumber)}
                                        showIconText={true}
                                        iconClassName="u-margin-end"
                                        data-analytics-name={UI_NAME.reorder}
                                    />
                                </div>
                            </div>
                        }
                    />
                ))}
            </div>
        </div>
    )
}

AccountOrderList.propTypes = {
    dashboardURL: PropTypes.string,
    orders: PropTypes.array,
    reorderItems: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    dashboardURL: getAccountURL,
    orders: getOrderList
})

const mapDispatchToProps = {
    reorderItems
}

export default template(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountOrderList)
)
