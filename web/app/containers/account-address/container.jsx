/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import template from '../../template'
import {createPropsSelector} from 'reselect-immutable-helpers'
import Card from '../../components/card'

import Button from 'progressive-web-sdk/dist/components/button'
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
// import {getTitle} from './selectors'

const AccountAddress = ({title}) => (
    <div className="t-account-address">
        <div className="t-account-address__heading u-padding-top-lg u-padding-bottom-lg u-padding-start-md u-padding-end-md">
            <div className="t-account-address__breadcrumb">
                <Breadcrumbs items={[{text: 'Back to Dashboard', href: '/customer/account'}]} />
            </div>
            <div className="u-margin-top-md">
                <h1 className="t-account-info__title u-text-uppercase u-width-1of2">Address Book</h1>
            </div>
            <Button
                text="Add new address"
                className="pw--tertiary u-margin-top-lg u-width-full u-text-weight-medium"
            />
        </div>
        <div className="t-account-address__sub-heading">
            <h2 className="u-h5 u-text-family">Default address</h2>
        </div>
        <div className="t-account-address__content u-padding-md">
            <Card
                hasBorder
                header={
                    <h3 className="u-padding-top-md u-padding-start-md u-padding-end-md">placeholder header</h3>
                }
                children={
                    <div className="u-padding-md">Address placeholder</div>
                }
                footer={
                    <Button
                        type="button"
                        title="Change Address"
                        className="u-width-full u-color-brand u-border-top"
                        icon="edit"
                        showIconText={true}
                        iconClassName="u-margin-end"
                    />
                }
            />
        </div>
        <div className="t-account-address__sub-heading">
            <h2 className="u-h5 u-text-family">Other saved addresses</h2>
        </div>
        <div className="t-account-address__content u-padding-md">
            <Card
                hasBorder
                header={
                    <h3 className="u-padding-top-md u-padding-start-md u-padding-end-md">placeholder header</h3>
                }
                children={
                    <div className="u-padding-md">Address 1</div>
                }
                footer={
                    <div className="u-flexbox">
                        <div className="u-flex u-border-end">
                            <Button
                                type="button"
                                title="Edit"
                                className="u-width-full u-color-brand u-border-top"
                                icon="edit"
                                showIconText={true}
                                iconClassName="u-margin-end"
                            />
                        </div>
                        <div className="u-flex">
                            <Button
                                type="button"
                                title="Delete"
                                className="u-width-full u-color-brand u-border-top"
                                icon="trash"
                                showIconText={true}
                                iconClassName="u-margin-end"
                            />
                        </div>
                    </div>
                }
            />
        </div>
    </div>
)

AccountAddress.propTypes = {
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
})

const mapDispatchToProps = {}

export default template(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountAddress)
)
