import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

/**
 * Skip Links are a simple technique that is used to provide a fast navigation
 * option for non-mouse users. For example, users who interact using keyboards,
 * screen readers or other assistive technologies.
 *
 * SkipLinks remain hidden until they are focused on by tabbing to it, etc., at
 * which point they become visible.
 *
 * @url: http://webaim.org/techniques/skipnav/
 */

const SkipLinks = ({className, items}) => {
    const classes = classNames('amp-skip-links', className)
    return (
        <div className={classes}>
            {items.map(({target, label}, key) =>
                <a href={target} className="amp-skip-links__anchor" key={`skip-link-${target}-${key}`}>
                    {label}
                </a>
            )}
        </div>
    )
}

SkipLinks.defaultProps = {
    items: []
}

export const targetPropType = (props, propName) => {
    const isAlphaNumeric = new RegExp(/^#[\w\-_]+$/).test(props[propName])
    if (!isAlphaNumeric) {
        return new Error('SkipLinks item target is invalid. Must be an ID selector, starting with "#" followed by alphanumeric characters, dashes and underscores with no spaces.')
    }

    return true
}

SkipLinks.propTypes = {
    /**
     * An array of items, each with a `target` and a `label`. See below for details.
     */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            target: targetPropType,
            label: PropTypes.string,
        })
    ).isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string
}

export default ampComponent(SkipLinks)
