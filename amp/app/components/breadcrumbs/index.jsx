import React, {PropTypes} from 'react'
import classNames from 'classnames'

// Components
import Link from 'mobify-amp-sdk/dist/components/link'
import {ampComponent} from '../../amp-sdk'

const Breadcrumbs = ({
    className,
    items,
    youAreHereMessage
}) => {
    if (!items.length) {
        return false
    }

    return (
        <nav role="navigation" className={classNames('a-breadcrumbs', className)}>
            <p id="breadcrumb__label" className="a-breadcrumbs__label u-visually-hidden">
                {youAreHereMessage}: {items[items.length - 1].text}
            </p>

            <ol aria-labelledby="breadcrumb__label" className="a-breadcrumbs__list">
                {items.map(({href, text, onClick}, index) => (
                    <li className="a-breadcrumbs__item" key={index}>
                        {href ?
                            <Link
                                href={href}
                                className="a-breadcrumbs__link"
                            >
                                {text}
                            </Link>
                        :
                            <span className="a-breadcrumbs__non-link">
                                {text}
                            </span>
                        }
                    </li>
                ))}
            </ol>
        </nav>
    )
}

Breadcrumbs.defaultProps = {
    items: [],
    youAreHereMessage: 'You are here'
}

Breadcrumbs.propTypes = {
    /**
     * The list of breadcrumbs
     *
     * Each breadcrumb should be an object with the structure:
     *
     * text: (required) A string containing the text of the breadcrumb
     *
     * href: (optional) A string containing the url the breadcrumb should link to
     *
     * If neither href not onClick is passed, the breadcrumb will be
     * rendered without an anchor tag wrapping it.
     */
    items: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.required,
        href: PropTypes.string
    })).isRequired,

    /**
     * CSS classes to add to the root element
     */
    className: PropTypes.string,

    /**
     * This component has a visually hidden label to make it more accessible
     *
     * You can change this property to change the label's content
     */
    youAreHereMessage: PropTypes.string
}

export default ampComponent(Breadcrumbs)
