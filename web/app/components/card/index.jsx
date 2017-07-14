/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'

/**
 * Card component is used to show content in a card with header and footer
 */

const Card = ({
    className,
    header,
    children,
    footer,
    hasShadow,
    hasBorder
}) => {
    const classes = classNames('c-card', {
        'c--shadow': hasShadow,
        'c--border': hasBorder,
    }, className)

    return (
        <article className={classes}>
            <div className="c-card__inner">
                {header &&
                    <header className="c-card__header">
                        {header}
                    </header>
                }
                <div className="c-card__content">
                    {children}
                </div>

                {footer &&
                    <footer className="c-card__footer">
                        {footer}
                    </footer>
                }
            </div>
        </article>
    )
}


Card.propTypes = {
    /**
     * Main content of the card
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Footer content of the card
     */
    footer: PropTypes.node,

    /**
     * Determines if card has border
     */
    hasBorder: PropTypes.bool,

    /**
     * Determines if card has box-shadow
     */
    hasShadow: PropTypes.bool,

    /**
     * Header content of the card
     */
    header: PropTypes.node,
}

export default Card
