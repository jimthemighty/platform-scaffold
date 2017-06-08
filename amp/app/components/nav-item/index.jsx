import React from 'react'
import classNames from 'classnames'
import ListTile from '../list-tile'

/**
 * A default renderer for items displayed in the navigation.
 */
const NavItem = (props) => {
    const {
        selected,
        title,
        className,
        childIcon,
        beforeContent,
        content,
        hasChild,
        href,
    } = props

    const classes = classNames('amp-nav-item', {
        'amp--has-child': hasChild,
        'amp--selected': selected,
    }, className)

    return (
        <ListTile
            className={classes}
            startAction={beforeContent}
            endAction={hasChild ? childIcon : undefined}
            href={href}
            includeEndActionInPrimary
        >
            {content || title}
        </ListTile>
    )
}

NavItem.defaultProps = {
    childIcon: '>'
}


NavItem.propTypes = {

    /**
     * Content to go before the main label on the nav item.
     */
    beforeContent: React.PropTypes.node,

    /**
     * Override the default icon for the has-child indicator.
     */
    childIcon: React.PropTypes.node,

    /**
     * Extra classes for the element.
     */
    className: React.PropTypes.string,

    /**
     * Override the main label content on the nav item (default
     * is its title).
     */
    content: React.PropTypes.node,

    /**
     * Indicates whether the item has children.
     */
    hasChild: React.PropTypes.bool,

    /**
     * The URL the NavItem links to
     */
    href: React.PropTypes.string,

    /**
     * Indicates whether the item is currently selected.
     */
    selected: React.PropTypes.bool,

    /**
     * The title of the navigation item.
     */
    title: React.PropTypes.string,

}


export default NavItem
