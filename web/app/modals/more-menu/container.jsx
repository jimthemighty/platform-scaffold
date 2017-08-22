/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {MORE_MENU} from '../constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {getRemoveItemID} from '../../containers/cart/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

import {getAccountURL} from '../../containers/app/selectors'

import {LOCATION_URL} from '../../containers/app/constants'


class MoreMenuModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {active: false}
    }

    componentWillMount() {
        setTimeout(() => {
            requestAnimationFrame(() => this.setState({active: true}))
        }, 100)
    }

    render() {
        const {closeModal, accountURL, isOpen} = this.props
        const modalClasses = classNames('m-more-menu', {
            'm--active': isOpen && this.state.active
        })

        return (
            <div>
                <div className={modalClasses}>
                    <div className="m-more-menu__content u-align-center u-padding-md u-padding-bottom-lg">
                        <div>
                            <Button
                                className="u-width-block-full"
                                innerClassName="u-color-neutral-60 u-justify-start"
                                iconClassName="u-color-brand"
                                href={LOCATION_URL}
                                icon="map"
                                data-analytics-name={UI_NAME.showStoreLocator}
                                title="Store Locations"
                                showIconText
                            />
                            <Button
                                innerClassName="u-color-neutral-60 u-justify-start"
                                iconClassName="u-color-brand"
                                href={accountURL}
                                icon="user"
                                data-analytics-name={UI_NAME.showStoreLocator}
                                title="My Account"
                                showIconText
                            />
                        </div>
                        <div className="u-border-top u-width-full">
                            <Button
                                className="u-width-block-full"
                                innerClassName="u-justify-start"
                                text="Forward"
                                onClick={() => { window.history.forward() }}
                            />

                            <Button
                                className="u-width-block-full"
                                innerClassName="u-justify-start"
                                text="Refresh"
                                onClick={() => { window.location.reload() }}
                            />

                            <Button
                                className="u-width-block-full"
                                innerClassName="u-justify-start"
                                text="Share..."
                                onClick={() => { alert('SHARE THIS URL!!') }}
                            />
                        </div>
                    </div>
                </div>

                <div
                    tabIndex="-1"
                    role="presentation"
                    className="m-more-menu__shade"
                    onTouchStart={closeModal}
                />
            </div>
        )
    }
}

MoreMenuModal.propTypes = {
    accountURL: React.PropTypes.string,
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
    accountURL: getAccountURL,
    isOpen: isModalOpen(MORE_MENU),
    removeItemID: getRemoveItemID
})

const mapDispatchToProps = {
    closeModal: () => closeModal(MORE_MENU, UI_NAME.removeItem),
}
export default connect(mapStateToProps, mapDispatchToProps)(MoreMenuModal)
