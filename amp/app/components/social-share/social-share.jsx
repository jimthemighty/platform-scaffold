/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

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
    options,
    className,
    isBlock,
    isInline
}) => {
    const classes = classNames('a-social-share', {
        'a--inline': isInline,
        'a--block': isBlock
    }, className)

    if (isInline && isBlock === true) {
        return new Error('You cannot have both inline and block, please pick one.')
    }

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
        layout: PropTypes.oneOf(['container', 'fill', 'fixed', 'fixed-height', 'flex-item', 'nodisplay', 'responsive']),
        media: PropTypes.string,
        paramText: PropTypes.string,
        quote: PropTypes.string,
        socialItemClass: PropTypes.string,
        socialShareClass: PropTypes.string,
        subject: PropTypes.string,
        text: PropTypes.string,
        url: PropTypes.string,
        width: PropTypes.number
    })).isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Add `a--inline` class to element if true.
     */
    isBlock: PropTypes.bool,

    /**
     * Add `a--block` class to element if true.
     */
    isInline: PropTypes.bool,
}

SocialShare.scripts = [
    '<script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>'
]

export default ampComponent(SocialShare)
