import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

const Nav = ({
    children,
    className
}) => {
    const classes = classNames('a-nav', className)

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

Nav.propTypes = {
    /**
     * The content that should be rendered within the Nav section
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
}

export default ampComponent(Nav)
