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
    footer
}) => {
    const classes = classNames('c-card u-border', className)

    return (
        <article className={classes}>
            <div className="c-card__inner">
                {header &&
                    <header className="c-card__header u-padding-md">
                        {header}
                    </header>
                }
                <div className="c-card__content u-padding-md">
                    {children}
                </div>

                {footer &&
                    <footer className="c-card__footer u-border-top">
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
     * Header content of the card
     */
    header: PropTypes.node,
}

export default Card
