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
        beforeContent: beforeContentProp,
        content: contentProp,
        hasChild,
        href,
    } = props


    const before = beforeContentProp
    const content = contentProp || title
    const after = hasChild ? childIcon : null
    const classes = classNames('a-nav-item', 'c-nav-item', {
        'a--has-child c--has-child': hasChild,
        'a--selected c--selected': selected,
    }, className)

    return (
        <ListTile
            className={classes}
            startAction={before}
            endAction={after}
            href={href}
            includeEndActionInPrimary
        >
            {content}
        </ListTile>
    )
}

NavItem.defaultProps = {
    navigate: /* istanbul ignore next */() => null,
    childIcon: '>',
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
     * Indicates whether the item is currently selected.
     */
    selected: React.PropTypes.bool,

    /**
     * The title of the navigation item.
     */
    title: React.PropTypes.string,

}


export default NavItem
