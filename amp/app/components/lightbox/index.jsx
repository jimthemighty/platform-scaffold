/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

/**
 * INSERT_DESCRIPTION_HERE
 */
const Lightbox = ({
    className,
    text
}) => {
    const classes = classNames('a-lightbox', {
        // 'a--modifier': bool ? true : false
    }, className)

    return (
        <div className={classes}>
            I am an example! {text}
        </div>
    )
}

Lightbox.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    text: PropTypes.string.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default ampComponent(Lightbox)
