import React, {PropTypes} from 'react'
import classNames from 'classnames'

// Components
import Link from 'mobify-amp-sdk/dist/components/link'

const HeaderBarTitle = ({
    href,
    children,
    className
}) => {
    const classes = classNames('a-header-bar__title', className)

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        )
    } else {
        return (
            <div className={classes}>
                {children}
            </div>
        )
    }
}

HeaderBarTitle.propTypes = {
    /**
     * The contents of the header bar
     */
    children: PropTypes.node.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * If provided, the title will be wrapped in a link
     */
    href: PropTypes.string,

}

export default HeaderBarTitle
