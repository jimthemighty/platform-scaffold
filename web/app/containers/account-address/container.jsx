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
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import {getDefaultAddress, getAddresses} from './selectors'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const AccountAddress = ({defaultAddress, addresses}) => {
    const {
        firstname,
        lastname,
        addressLine1,
        city,
        countryId,
        postcode,
        telephone,
        regionId
    } = defaultAddress

    const addressBlock =
    (<div className="u-padding-md">
        {firstname ?
            <p>{firstname} {lastname}</p>
            :
            <SkeletonText width="50%" style={{lineHeight: '20px'}} />
        }
        {addressLine1 ?
            <p>{addressLine1}</p>
            :
            <SkeletonText width="60%" style={{lineHeight: '20px'}} />
        }
        {city ?
            <p>{city}, {regionId}, {postcode}</p>
            :
            <SkeletonText width="70%" style={{lineHeight: '20px'}} />
        }
        {countryId ?
            <p>{countryId}</p>
            :
            <SkeletonText width="40%" style={{lineHeight: '20px'}} />
        }
        {telephone ?
            <p>{telephone}</p>
            :
            <SkeletonText width="50%" style={{lineHeight: '20px'}} />
        }
    </div>)
    return (
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
                    data-analytics-name={UI_NAME.addNewAddress}
                />
            </div>
            <div className="t-account-address__content u-padding-md">
                <Card
                    hasBorder
                    header={
                        <h3 className="u-padding-top-md u-padding-start-md u-padding-end-md">Default address</h3>
                    }
                    children={addressBlock}
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
                {addresses.map(({firstname, lastname, addressLine1, city, countryId, postcode, telephone, regionId}, idx) => {
                    return (
                        <Card key={idx}
                            hasBorder
                            children={addressBlock}
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
                    )
                })}
            </div>
        </div>
    )
}

AccountAddress.propTypes = {
    addresses: PropTypes.array,
    defaultAddress: PropTypes.object
}

const mapStateToProps = createPropsSelector({
    addresses: getAddresses,
    defaultAddress: getDefaultAddress
})

const mapDispatchToProps = {}

export default template(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountAddress)
)
