import React, {PropTypes} from 'react'
import classNames from 'classnames'

// Components
import Link from '../link'
import {ampComponent} from '../../amp-sdk'

const ListTilePrimary = ({
    children,
    href
}) => {
    const listTileProps = {
        className: 'amp-list-tile__primary'
    }
    return (
        <Link href={href} {...listTileProps}>
            {children}
        </Link>
    )
}

ListTilePrimary.propTypes = {
    /**
     * PROVIDED INTERNALLY: the contents of the primary part of the ListTile
     */
    children: PropTypes.node,

    /**
     * PROVIDED INTERNALLY: The URL to link to from the primary part
     */
    href: PropTypes.string
}

const ListTile = ({
    className,
    startAction,
    endAction,
    children,
    href,
    includeEndActionInPrimary
}) => {

    const classes = classNames('amp-list-tile', {
        'amp--is-anchor': !!href
    }, className)

    return (
        <div className={classes}>
            <ListTilePrimary href={href}>
                {startAction &&
                    <div className="amp-list-tile__action">
                        {startAction}
                    </div>
                }

                <div className="amp-list-tile__content">
                    {children}
                </div>

                {includeEndActionInPrimary && endAction &&
                    <div className="amp-list-tile__action">
                        {endAction}
                    </div>
                }
            </ListTilePrimary>


            {!includeEndActionInPrimary && endAction &&
                <div className="amp-list-tile__action">
                    {endAction}
                </div>
            }
        </div>
    )
}

ListTile.defaultProps = {
    includeEndActionInPrimary: true
}

ListTile.propTypes = {
    /**
     * The content that should be rendered within the ListTile primary
     * section, excluding the action.
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * The content that appears at the end of the list tile.
     * Can be a supplementary action
     */
    endAction: PropTypes.node,

    /**
     * If provided, the primary part of the ListTile will be rendered
     * as a Link to this URL.
     */
    href: PropTypes.string,

    /**
    * Indicates if the endAction should be included inside the primary part.
    * If true, clicking endAction will perform the same action as the primary content
    */
    includeEndActionInPrimary: PropTypes.bool,

    /**
     * The content that appears at the start of the list tile. Generally supplementary icon or text
     */
    startAction: PropTypes.node
}

export default ampComponent(ListTile)
