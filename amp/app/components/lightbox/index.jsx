/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk' // change when move to SDK

/**
 * Allows for a “lightbox” or similar experience where upon user interaction, a
 * component expands to fill the viewport until it is closed again by the user.
 */
const Lightbox = ({
    id,
    className,
    children,
    scrollable
}) => {
    const classes = classNames('a-lightbox', className)

    return (
        /* eslint-disable react/self-closing-comp */
        <amp-lightbox
            class={classes}
            id={id}
            layout="nodisplay"
            scrollable={scrollable ? '' : undefined}
        >
            <div className="a-lightbox__mask" on={`tap:${id}.close`} role="button" tabIndex="0"></div>

            {children}
        </amp-lightbox>
    )
}

Lightbox.propTypes = {
    /**
     * A unique identifer for the lightbox.
     */
    id: PropTypes.string.isRequired,

    /**
     * Any children to be nested.
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element.
     */
    className: PropTypes.string,

    /**
     * When `scrollable` attribute is present, the content of the lightbox can
     * scroll when overflowing the height of the lightbox.
     */
    scrollable: PropTypes.bool
}

Lightbox.scripts = [
    '<script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>'
]

export default ampComponent(Lightbox)
