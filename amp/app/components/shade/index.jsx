import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

/**
 * INSERT_DESCRIPTION_HERE
 */

const Shade = ({
    className,
    text
}) => {
    const classes = classNames('a-shade', {
        // '<%= context.COMPONENT_NAMESPACE %>--modifier': bool ? true : false
    }, className)

    return (
        <div className={classes}>
            I am an example! {text}
        </div>
    )
}

Shade.propTypes = {
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

export default ampComponent(Shade)
