import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ampSDK from '../../amp-sdk'

/**
 * A form component that automatically includes the required amp-form script.
 */
const AmpForm = ({
    className,
    children,
    action,
    target,
    method,
    ...extra
}) => {
    const classes = classNames('c-amp-form', {}, className)

    return (
        <form className={classes} action={action} target={target} method={method} {...extra}>
            {children}
        </form>
    )
}


AmpForm.propTypes = {
    /**
     * The form action
     */
    action: PropTypes.string,
    /**
     * The children of the form
     */
    children: PropTypes.node,
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
    /**
     * The form method
     */
    method: PropTypes.string,
    /**
     * The form target
     */
    target: PropTypes.string
}


export default ampSDK.ampComponent(
    AmpForm,
    '<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>'
)
