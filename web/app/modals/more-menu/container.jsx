/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {MORE_MENU} from '../constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {getRemoveItemID} from '../../containers/cart/selectors'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const MoreMenuModal = ({closeModal, isOpen, duration}) => {
    return (
        <Sheet
            className="pw--no-shadow m-cart__remove-item-confirmation-modal"
            open={isOpen}
            onDismiss={closeModal}
            duration={duration}
            maskOpacity={0}
            effect="modal-center"
            shrinkToContent={true}
            coverage="40%"
        >
            <div className="u-flexbox u-direction-column u-align-center u-padding-md u-padding-top-lg u-padding-bottom-lg u-text-align-center">
                This is some menu content
            </div>
        </Sheet>
    )
}

MoreMenuModal.propTypes = {
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
    * Removes the item from the cart
    */
    removeItem: React.PropTypes.func,
    /**
    * The id of the item being deleted
    */
    removeItemID: React.PropTypes.string
}

const mapStateToProps = createPropsSelector({
    isOpen: isModalOpen(MORE_MENU),
    removeItemID: getRemoveItemID
})

const mapDispatchToProps = {
    closeModal: () => closeModal(MORE_MENU, UI_NAME.removeItem),
}
export default connect(mapStateToProps, mapDispatchToProps)(MoreMenuModal)
