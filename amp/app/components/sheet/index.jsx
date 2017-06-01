import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ampSDK from '../../amp-sdk'

/**
 * AMP Sheet Component
 */

const Sheet = ({className, children, id}) => {
    const classes = classNames('c-sheet', {
        //
    }, className)
    return (
        <amp-sidebar id={id} class={classes} layout='nodisplay'>
            {children}
        </amp-sidebar>
    )
}

Sheet.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string
}

export default ampSDK.ampComponent(
    Sheet,
    '<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>'
)
