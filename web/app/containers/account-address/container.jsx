/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import template from '../../template'
import {createPropsSelector} from 'reselect-immutable-helpers'
import Card from '../../components/card'
import Button from 'progressive-web-sdk/dist/components/button'
import {deleteAddress} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import AddressBlock from '../../components/address-block'
import {getDefaultAddress, getAddresses} from 'progressive-web-sdk/dist/store/user/selectors'
import {getAccountURL} from '../app/selectors'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {openModal} from '../../modals/actions'
import {
    ACCOUNT_ADDRESS_MODAL,
    ACCOUNT_REMOVE_ADDRESS_MODAL
} from '../../modals/constants'
import {setAddressID, setIsEditing} from './actions'

const NoAddress = ({dashboardURL, openAddressModal}) => (
    <div className="t-account-address__empty">
        <div className="t-account-address__heading u-padding-top-lg u-padding-bottom-lg u-padding-start-md u-padding-end-md">
            <div className="t-account-address__breadcrumb">
                <Breadcrumbs items={[{text: 'Back to Dashboard', href: dashboardURL}]} />
            </div>
            <div className="u-margin-top-md">
                <h1 className="t-account-info__title u-text-uppercase u-width-1of2">Address Book</h1>
            </div>
        </div>
        <div className="u-padding-md u-margin-top-lg u-flexbox u-direction-column u-align-center u-justify-center">
            <Icon
                name="empty"
                className="u-color-brand"
                size="huge"
            />
            <div className="u-text-align-center u-padding-lg">
                You have no saved addresses.
                    </div>
            <Button
                text="Add a new address"
                onClick={openAddressModal}
                className="pw--tertiary u-width-full u-text-uppercase"
                data-analytics-name={UI_NAME.addNewAddress}
            />
        </div>
    </div>
)

NoAddress.propTypes = {
    dashboardURL: PropTypes.string,
    openAddressModal: PropTypes.func
}

const AccountAddress = ({
    defaultAddress,
    addresses,
    dashboardURL,
    openRemoveAddressModal,
    openAddressModal,
    setIsEditing,
    setAddressID
}) => {

    return (
        <div>
            {defaultAddress ?
                <div className="t-account-address">
                    <div className="t-account-address__heading u-padding-top-lg u-padding-bottom-lg u-padding-start-md u-padding-end-md">
                        <div className="t-account-address__breadcrumb">
                            <Breadcrumbs items={[{text: 'Back to Dashboard', href: dashboardURL}]} />
                        </div>
                        <div className="u-margin-top-md">
                            <h1 className="t-account-info__title u-text-uppercase u-width-1of2">Address Book</h1>
                        </div>
                        <Button
                            text="Add new address"
                            className="pw--tertiary u-margin-top-lg u-width-full u-text-weight-medium"
                            data-analytics-name={UI_NAME.addNewAddress}
                            onClick={() => {
                                openAddressModal()
                                setAddressID('')
                            }}
                        />
                        <div className="t-account-address__content u-padding-top-md">
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
                                        onClick={() => {
                                            openAddressModal()
                                            setAddressID(defaultAddress.id)
                                            setIsEditing(true)
                                        }}
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
                                                        onClick={() => {
                                                            openAddressModal()
                                                            setAddressID(address.id)
                                                            setIsEditing(true)
                                                        }}
                                                    />
                                                </div>
                                                <div className="u-flex">
                                                    <Button
                                                        type="button"
                                                        title="Delete"
                                                        onClick={() => {
                                                            openRemoveAddressModal()
                                                            setAddressID(address.id)
                                                        }}
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
                </div>
            :
                <NoAddress dashboardURL={dashboardURL} openAddressModal={openAddressModal} />
            }
        </div>
    )
}

AccountAddress.propTypes = {
    addresses: PropTypes.array,
    dashboardURL: PropTypes.string,
    defaultAddress: PropTypes.object,
    isEditting: PropTypes.bool,
    openAddressModal: PropTypes.func,
    openRemoveAddressModal: PropTypes.func,
    setAddressID: PropTypes.func,
    setIsEditing: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    addresses: getAddresses,
    defaultAddress: getDefaultAddress,
    dashboardURL: getAccountURL,
})

const mapDispatchToProps = {
    openAddressModal: () => openModal(ACCOUNT_ADDRESS_MODAL, UI_NAME.address),
    openRemoveAddressModal: () => openModal(ACCOUNT_REMOVE_ADDRESS_MODAL, UI_NAME.removeSavedAddress),
    setAddressID,
    setIsEditing,
    removeAddress: deleteAddress
}

export default template(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountAddress)
)
