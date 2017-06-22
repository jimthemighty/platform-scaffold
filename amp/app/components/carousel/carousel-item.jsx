import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Link from '../link'

/**
 * A single item to be displaced within the Carousel component.
 */
const CarouselItem = ({
    active,
    children,
    className,
    href,
    openInNewTab
}) => {
    const Item = href ? Link : 'div'
    const itemProps = {
        className: classNames(`pw-carousel__item c-carousel__item`, {
            'pw--active c--active': active
        }, className),
        'aria-hidden': active ? 'false' : 'true',
        tabIndex: active ? '0' : '-1',
        'aria-live': active ? 'polite' : ''
    }

    if (href) {
        itemProps.href = href
        itemProps.openInNewTab = openInNewTab
    }

    return (
        <Item {...itemProps}>
            {children}
        </Item>
    )
}

CarouselItem.propTypes = {
    /**
     * PROVIDED INTERNALLY: Defines if the item is active or not
     */
    active: PropTypes.bool,

    /**
     * A caption for the contents, to be (optionally) displayed by the carousel.
     */
    caption: PropTypes.string,

    /**
     * The contents of the carousel item, to be shown in the carousel.
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * If specified, the component is rendered as a link, with this value set as the href
     */
    href: PropTypes.string,

    /**
     * If rendered as a link, when the CarouselItem is clicked the corresponding link opens in a new tab.
     */
    openInNewTab: PropTypes.bool
}

export default CarouselItem
