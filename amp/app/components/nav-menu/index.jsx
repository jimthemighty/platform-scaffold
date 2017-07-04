import React from 'react'
import classNames from 'classnames'

// Components
import NavItem from '../nav-item'
import {ampComponent} from '../../amp-sdk'

/**
 * Returns a mapping of
 *
 * {path: {node, parentNode}}
 *
 * for each NavItem in the navigation tree.
 */

const mapNodes = (root) => {
    const inner = (node, parent = undefined, map = {}) => {
        parent = parent || node      // Root is its own parent
        const path = node.path
        const children = node.children || []

        if (map.hasOwnProperty(path)) {
            throw new Error(`Each NavItem must have a unique "path" prop. Path "${path}" appeared twice.`)
        }
        map[path] = {node, parent}
        children.forEach((child) => {
            inner(child, node, map)
        })
        return map
    }
    return root === undefined ? {} : inner(root)
}

const NavMenu = ({root, path, itemFactory, className}) => {
    const nodes = mapNodes(root)
    const {node: selected, parent: selectedParent} = nodes[path]

    const isLeaf = (selected.children || []).length === 0
    const expanded = isLeaf ? selectedParent : selected
    const children = expanded.children || []

    const classes = classNames('a-nav-menu', {}, className)

    return (
        <div className={classes}>
            <div className="a-nav-menu__panel">
                {children.map((child) => {
                    const props = {
                        key: child.path,
                        href: child.path,
                        title: child.title,
                        selected: child.path === selected.path
                    }
                    const type = child.type
                    return itemFactory(type, props)
                })}
            </div>
        </div>
    )
}

const defaultItemFactory = (type, props) => {
    return <NavItem {...props} />
}

NavMenu.defaultProps = {
    itemFactory: defaultItemFactory,
    path: '/',
    root: {title: '', path: '/'},
}

NavMenu.propTypes = {
    /**
     * Extra classes for the element
     */
    className: React.PropTypes.string,

    /**
     * Factory function to render menu items for display
     */
    itemFactory: React.PropTypes.func,

    /**
     * The currently selected path in the navigation.
     */
    path: React.PropTypes.string,

    /**
     * The structure of the navigation as a JS object
     */
    root: React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        path: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        children: React.PropTypes.array
    })
}

export default ampComponent(NavMenu)