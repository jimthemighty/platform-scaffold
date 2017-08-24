/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {MORE_MENU} from '../constants'
import {closeModal, openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Divider from 'progressive-web-sdk/dist/components/divider'
import Share from 'progressive-web-sdk/dist/components/share'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

import {getAccountURL} from '../../containers/app/selectors'

import {LOCATION_URL} from '../../containers/app/constants'

const SHARE_MODAL = 'share'


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
        const {closeModal, accountURL, isOpen, closeShare, openShare, isShareOpen} = this.props
        const modalClasses = classNames('m-more-menu', {
            'm--active': isOpen && this.state.active
        })
        const linkClasses = 'u-justify-start u-padding-start-lg u-padding-end-lg'
        const shareButton = (<Button
            className="u-width-block-full"
            innerClassName="u-text-size-medium u-justify-start u-padding-start-lg u-padding-end-lg"
            text="Share..."
            data-analytics-name={UI_NAME.shareMenu}
        />)

        return (
            <div>
                <div className={modalClasses}>
                    <div className="m-more-menu__content u-align-center u-padding-bottom u-padding-top">
                        <div>
                            <Button
                                className="u-width-block-full"
                                innerClassName={`${linkClasses} u-color-neutral-60`}
                                iconClassName="u-color-brand u-margin-end"
                                href={LOCATION_URL}
                                icon="map"
                                data-analytics-name={UI_NAME.showStoreLocator}
                                title="Store Locations"
                                showIconText
                            />
                            <Button
                                innerClassName={`${linkClasses} u-color-neutral-60`}
                                iconClassName="u-color-brand u-margin-end"
                                href={accountURL}
                                icon="user"
                                data-analytics-name={UI_NAME.showStoreLocator}
                                title="My Account"
                                showIconText
                            />
                        </div>
                        <Divider />
                        <div>
                            <Button
                                className="u-width-block-full"
                                innerClassName={linkClasses}
                                text="Forward"
                                onClick={() => { window.history.forward() }}
                                data-analytics-name={UI_NAME.browserForward}
                            />

                            <Button
                                className="u-width-block-full"
                                innerClassName={linkClasses}
                                text="Refresh"
                                onClick={() => { window.location.reload() }}
                            />
                            <Share
                                triggerElement={shareButton}
                                open={isShareOpen}
                                onShow={openShare}
                                onDismiss={closeShare}
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
    /**
     * The URL for the My account page
     */
    accountURL: React.PropTypes.string,
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: React.PropTypes.func,
    /**
     * A function to close the share modal
     */
    closeShare: React.PropTypes.func,
    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,
    /**
     * Whether the share modal is open or not
     */
    isShareOpen: React.PropTypes.bool,
    /**
     * A function to open the share modal
     */
    openShare: React.PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    accountURL: getAccountURL,
    isOpen: isModalOpen(MORE_MENU),
    isShareOpen: isModalOpen(SHARE_MODAL)
})

const mapDispatchToProps = {
    closeModal: () => closeModal(MORE_MENU, UI_NAME.removeItem),
    closeShare: () => closeModal(SHARE_MODAL, UI_NAME.shareMenu),
    openShare: () => openModal(SHARE_MODAL, UI_NAME.shareMenu)
}
export default connect(mapStateToProps, mapDispatchToProps)(MoreMenuModal)
