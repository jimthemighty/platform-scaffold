import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

/**
 * A form component that automatically includes the required a-form script.
 */
const AmpForm = ({
    className,
    children,
    ...props
}) => {
    const classes = classNames('c-a-form', className)
    return (
        <form className={classes} {...props}>
            {children}
        </form>
    )
}

AmpForm.propTypes = {
    /**
     * The children of the form
     */
    children: PropTypes.node,
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
}

AmpForm.scripts = [
    '<script async custom-element="a-form" src="https://cdn.ampproject.org/v0/a-form-0.1.js"></script>'
]

export default ampComponent(AmpForm)
