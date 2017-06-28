import React, {PropTypes} from 'react'
import classNames from 'classnames'

const HeaderBarActions = ({
    children,
    className
}) => {
    const classes = classNames('a-header-bar__actions', className)

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

HeaderBarActions.propTypes = {
    /**
     * The contents of the header bar
     */
    children: PropTypes.node.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default HeaderBarActions
