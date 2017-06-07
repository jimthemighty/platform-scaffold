import React from 'react'
import classNames from 'classnames'
import NavItem from '../nav-item'

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


const Nav = ({root, path, itemFactory, className}) => {
    const nodes = mapNodes(root)
    const {node: selected, parent: selectedParent} = nodes[path]

    const isLeaf = (selected.children || []).length === 0
    const expanded = isLeaf ? selectedParent : selected
    const children = expanded.children || []

    const classes = classNames('a-nav', 'c-nav', {}, className)

    return (
        <div className={classes}>
            {children.map(child => {
                const props = {
                    href: child.path,
                    title: child.title,
                    selected: child.path === selected.path
                }
                const type = child.type
                return itemFactory(type, props)
            })}
        </div>
    )
}

const defaultItemFactory = (type, props) => {
    return <NavItem {...props} />
}

Nav.defaultProps = {
    itemFactory: defaultItemFactory
}

export default Nav
