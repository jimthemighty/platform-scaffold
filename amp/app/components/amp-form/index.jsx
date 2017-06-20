import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ampSDK from '../../amp-sdk'

/**
 * A form component that automatically includes the required amp-form script.
 */
const AmpForm = ({
    className,
    children,
    ...props
}) => {
    const classes = classNames('c-amp-form', className)
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

export default ampSDK.ampComponent(
    AmpForm,
    '<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>'
)
