import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'

/**
 * FieldRow is used to group multiple Fields on one line of a form.
 */
const FieldRow = ({
    className,
    children
}) => {
    const classes = classNames('a-field-row', className)

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

FieldRow.propTypes = {
    /**
     * The content that should be rendered within c-field-row
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string
}

export default ampComponent(FieldRow)
