/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable react/self-closing-comp */
import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'

// Components
import SocialShareItem from './social-share-item'

/**
 * The amp-social-share component displays a social share button for various
 * social platform providers.
 */

const SocialShare = ({
    className,
    options
}) => {
    const classes = classNames('c-social-share', className)

    return (
        <div className={classes}>
            {options.map((props, index) => <SocialShareItem {...props} key={index} />)}
        </div>
    )
}

SocialShare.defaultProps = {
    options: []
}

SocialShare.propTypes = {
    /**
     * Pre-configured providers for the `amp-social-share`
     */
    options: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        appId: PropTypes.string,
        body: PropTypes.string,
        description: PropTypes.string,
        endpoint: PropTypes.string,
        height: PropTypes.number,
        href: PropTypes.string,
        isInline: PropTypes.bool,
        layout: PropTypes.string,
        media: PropTypes.string,
        quote: PropTypes.string,
        socialItemClass: PropTypes.string,
        subject: PropTypes.string,
        text: PropTypes.string,
        url: PropTypes.number,
        width: PropTypes.number
    })).isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
}

SocialShare.scripts = [
    '<script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>'
]

export default ampComponent(SocialShare)
