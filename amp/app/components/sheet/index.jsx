import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

/**
 * AMP Sheet Component
 *
 * This component must be a direct child of the <body> tag to pass AMP Validator.
 */

const Sheet = ({
    children,
    className,
    footerContent,
    headerContent,
    id,
    side,
    title,
    shrinkToContent,
    noShadow
}) => {
    const classes = classNames('amp-sheet', {
        'amp--no-shadow': noShadow
    }, className)

    const innerClasses = classNames('amp-sheet__inner', {
        'amp--shrink-to-content': shrinkToContent
    })

    const header = (headerContent || title) && (
        <div className="amp-sheet__header">
            {title &&
                <h1>{title}</h1>
            }

            {headerContent}
        </div>
    )

    const footer = footerContent && (
        <div className="amp-sheet__footer">
            {footerContent}
        </div>
    )

    return (
        <amp-sidebar id={id} class={classes} layout="nodisplay" side={side}>
            <div className={innerClasses}>
                {header}

                <div className="amp-sheet__content">
                    {children}
                </div>

                {footer}
            </div>
        </amp-sidebar>
    )
}

Sheet.propTypes = {
    /**
     * User-defined content of the sheet, can be a combination of markup and/or
     * React components.
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */

    className: PropTypes.string,

    /**
     * User-defined footer of the sheet
     */
    footerContent: PropTypes.element,

    /**
     * User-defined header of the sheet
     */
    headerContent: PropTypes.element,

    /**
     * Set ID of root element. Generally used to backtrace the source of a sheet
     */
    id: PropTypes.string,

    /**
     * Remove shadow to Sheet
     */
    noShadow: PropTypes.bool,

    /**
     * Dictate whether the height of the modal grows to the maximum height as
     * declared by the `coverage` prop, or to shrink down to the height of the
     * modal's content.
     */
    shrinkToContent: PropTypes.bool,

    /**
     * Type will define the entry point of the sheet. See below for details.
     */
    side: PropTypes.oneOf([
        'right',
        'left'
    ]),

    /**
     * User-defined title of the sheet
     */
    title: PropTypes.string
}

Sheet.defaultProps = {
    noShadow: false,
    shrinkToContent: false,
    side: 'left'
}

Sheet.scripts = [
    '<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>'
]

export default ampComponent(Sheet)
