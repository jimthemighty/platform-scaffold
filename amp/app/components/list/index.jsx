import React, {PropTypes} from 'react'
import classNames from 'classnames'

// Components
import ListTile from '../list-tile'
import {ampComponent} from '../../amp-sdk'

/**
 * The `List` component is used to enclose a series of related items, providing a
 * consistent balance of space and separation between each item.
 */

const List = ({
    items,
    className,
    component,
    children
}) => {
    const classes = classNames('amp-list', className)

    return (
        <div className={classes}>
            {React.Children.count(children) ? children : items.map((item, idx) => {
                const componentToRender = item.component || component || ListTile

                return React.createElement(componentToRender, {
                    key: idx,
                    children: item.children || item.title,
                    className: 'amp-list__item',
                    ...item
                })
            })}
        </div>
    )
}

List.defaultProps = {
    items: []
}

List.propTypes = {
    /**
     * Any children to be nested within the List.
     */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),

    /**
     * The CSS class/classes to be applied to the root element.
     */
    className: PropTypes.string,

    /**
     * The component to render for each item.
     * By default, List will render ListTiles.
     * If an item has a component prop defined within its data,
     * that component will be rendered instead.
     */
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    /**
     * An array of the items that should be rendered.
     */
    items: PropTypes.arrayOf(PropTypes.object),
}

export default ampComponent(List)
