/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {ADD_ADDRESS_MODAL} from '../constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import AccountAddressReduxForm from '../../containers/account-address/partials/address-form'
import AddAddressHeader from './partials/add-address-header'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
// import Button from 'progressive-web-sdk/dist/components/button'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const AccountAddressModal = ({closeModal, isOpen, duration}) => {
    return (
        <Sheet
            className="pw--no-shadow"
            open={isOpen}
            onDismiss={closeModal}
            duration={duration}
            effect="slide-bottom"
            coverage="100%"
        >
            <AddAddressHeader closeAddressModal={closeModal} />
            <AccountAddressReduxForm />
        </Sheet>
    )
}

AccountAddressModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: React.PropTypes.func,
    /**
     * Duration will define the time the animation takes to complete.
     */
    duration: React.PropTypes.number,
    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,
    /**
     * A function used to set the address sheet's state to open
     */
    openModal: React.PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    isOpen: isModalOpen(ADD_ADDRESS_MODAL),
})

const mapDispatchToProps = {
    closeModal: () => closeModal(ADD_ADDRESS_MODAL, UI_NAME.addNewAddress),
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountAddressModal)
