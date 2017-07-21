/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import template from '../../template'
import {createPropsSelector} from 'reselect-immutable-helpers'
import Card from '../../components/card'

import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import AddressBlock from './partials/account-address-block'
import {getDefaultAddress, getAddresses} from '../../store/user/selectors'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {openAddAddressModal} from './actions'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {ADD_ADDRESS_MODAL} from '../../modals/constants'


const NoAddress = () => (
    <div className="t-account-address__empty u-padding-md u-flexbox u-direction-column u-align-center u-justify-center">
        <Image
            className="u-flex-none"
            alt="Crystal Ball"
            width="122px"
            height="110px"
            src={getAssetUrl('static/img/onboarding/location.png')}
        />
        <div className="u-text-align-center u-padding-lg">
            You have no saved addresses.
        </div>
        <Button text="Add a new address" href="/" className="pw--tertiary u-width-full u-text-uppercase " />
    </div>
)

class AccountAddress extends React.Component {
    constructor(props) {
        super(props)

        this.addAddress = this.addAddress.bind(this)
    }

    addAddress() {
        this.props.openAddAddressModal()
    }

    render() {
        const {
            defaultAddress,
            addresses
        } = this.props

        return (
            <div>
                {defaultAddress ?
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
                                onClick={this.addAddress}
                            />
                        </div>
                        <div className="t-account-address__content u-padding-md">
                            <Card
                                hasBorder
                                header={
                                    <h3 className="u-padding-top-md u-padding-start-md u-padding-end-md">Default address</h3>
                                }
                                children={<AddressBlock {...defaultAddress} />}
                                footer={
                                    <Button
                                        type="button"
                                        title="Change Address"
                                        className="u-width-full u-color-brand u-border-top"
                                        icon="edit"
                                        showIconText={true}
                                        iconClassName="u-margin-end"
                                        data-analytics-name={UI_NAME.editSavedAddress}
                                    />
                                }
                            />
                            {addresses.map((address, idx) => {
                                return (
                                    <Card key={idx}
                                        hasBorder
                                        children={<AddressBlock {...address} />}
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
                                                        data-analytics-name={UI_NAME.editSavedAddress}
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
                                                        data-analytics-name={UI_NAME.removeSavedAddress}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    />
                                )
                            })}
                        </div>
                    </div>
                :
                    <NoAddress />
                }
            </div>
        )
    }
}

AccountAddress.propTypes = {
    addresses: PropTypes.array,
    defaultAddress: PropTypes.object,
    openAddAddressModal: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    addresses: getAddresses,
    defaultAddress: getDefaultAddress
})

const mapDispatchToProps = {
    openAddAddressModal: () => openModal(ADD_ADDRESS_MODAL)
}

export default template(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountAddress)
)
