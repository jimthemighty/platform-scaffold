import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

/**
 * A form component that automatically includes the required amp-form script.
 */
const Form = ({
    className,
    children,
    ...props
}) => {
    const classes = classNames('a-form', className)
    return (
        <form className={classes} {...props}>
            {children}
        </form>
    )
}

Form.propTypes = {
    /**
     * The children of the form
     */
    children: PropTypes.node,
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
}

Form.scripts = [
    '<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>'
]

export default ampComponent(Form)
