import React, {PropTypes} from 'react'
import classNames from 'classnames'

const HeaderBar = ({className, children}) => {

    const classes = classNames('amp-header-bar', className)

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

HeaderBar.propTypes = {
    // The contents of the header bar
    children: PropTypes.node.isRequired,
    // Any additional classes you wish to apply to the root element
    className: PropTypes.string,
}

export default HeaderBar
