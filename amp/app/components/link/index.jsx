import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

/**
 * A link that supports extra analytics-related attributes. It can take the link
 * text/content either as child elements or as a `text` prop.
 * If no href is passed, the link is rendered with a `#` href.
 */

const Link = ({
    children,
    className,
    href,
    openInNewTab,
    text,
    ...props
}) => {
    let contents
    if ((!children || !children.length) && text) {
        contents = text
    } else {
        contents = children
    }

    const attrs = {
        className: classNames('a-link', className),
        ...props
    }

    if (openInNewTab) {
        attrs.target = '_blank'
        attrs.rel = 'noopener'
    }

    const trackingIDStr = 'CLIENT_ID(sandy-client-id)'

    if (href !== '#') {
        const parameter = href.includes('?') ? '&' : '?'
        href = href.replace('http:', 'https:') // Enforce https outbound otherwise VAR substitution will fail
        href = `${href}${parameter}mobify_id=${trackingIDStr}`

        attrs['data-vars-outbound-link'] = href
        attrs['data-amp-replace'] = 'CLIENT_ID'
    }

    return <a href={href} {...attrs}>{contents}</a>
}

Link.defaultProps = {
    href: '#'
}

Link.propTypes = {
    /**
     * Any children for the Link component or anchor element.
     */
    children: PropTypes.node,
    /**
     * The CSS class/classes to be applied to the result
     */
    className: PropTypes.string,
    /**
     * The intended target URL.
     */
    href: PropTypes.string,
    /**
     * If true, target="_blank" will be added to the link.
     * Only use this property if you trust the link! https://mathiasbynens.github.io/rel-noopener
     */
    openInNewTab: PropTypes.bool,
    /**
     * The text of the link (only used if no children are passed)
     */
    text: PropTypes.string
}

Link.displayName = 'Link'

export default ampComponent(Link)
