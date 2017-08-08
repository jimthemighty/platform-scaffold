/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'

const SocialShareItem = ({
    type,
    appId,
    body,
    description,
    endpoint,
    height,
    href,
    isInline,
    layout,
    media,
    quote,
    socialItemClass,
    subject,
    text,
    url,
    width
}) => {
    const classes = classNames('c-social-share__item', {
        'c--inline': isInline ? true : false
    }, socialItemClass)

    // if type is facebook and it requires value for `data-param-app_id` attribute
    if (type === 'facebook') {
        if (appId === undefined) {
            return new Error('Facebook requires `appId` for the Facebook Share dialog.')
        }
    }

    return (
        <amp-social-share
            class={classes}
            type={type}
            layout={layout}
            width={width}
            height={height}
            data-share-endpoint={endpoint}
            data-param-subject={subject}
            data-param-body={body}
            data-param-app_id={appId}
            data-param-href={href}
            data-param-quote={quote}
            data-param-url={url}
            data-param-media={media}
            data-param-description={description}
            data-param-text={text}
        >
            {body}
        </amp-social-share>
    )
}

SocialShareItem.defaultProps = {
    width: '60',
    height: '44'
}

SocialShareItem.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide.
     */
    type: PropTypes.string.isRequired,

    /**
     * This parameter is the Facebook `app_id` that's required for the Facebook
     * Share dialog.
     */
    appId: PropTypes.string,

    /**
     * Add content to the body.
     */
    body: PropTypes.string,

    /**
     * `data-param-description`: optional, defaults to: Current page title.
     */
    description: PropTypes.string,

    /**
     * This attribute is required for non-configured providers.
     *
     * Some popular providers have pre-configured share endpoints. For details,
     * see the Pre-configured Providers section. For non-configured providers,
     * you'll need to specify the share endpoint.
     */
    endpoint: PropTypes.string,

    /**
     * Height of item.
     */
    height: PropTypes.number,

    /**
     * `data-param-href`: optional, defaults to: `rel=canonical` URL
     */
    href: PropTypes.string,

    /**
     * Add `c--inline` class to element if true.
     */
    isInline: PropTypes.bool,

    /**
     * Layouts Supported
     */
    layout: PropTypes.oneOf(['container', 'fill', 'fixed', 'fixed-height', 'flex-item', 'nodisplay', 'responsive']),

    /**
     * `data-param-media`: optional (but highly recommended to be set), defaults
     * to: none. Url for the media to be shared on Pinterest. If not set, the
     * end user will be requested to upload a media by Pinterest.
     */
    media: PropTypes.string,

    /**
     * `data-param-quote`: optional. Can be used to share a quote or text.
     */
    quote: PropTypes.string,

    /**
     * Class to add to `amp-social-share` item.
     */
    socialItemClass: PropTypes.string,

    /**
     * `data-param-subject`: optional, defaults to: Current page title.
     */
    subject: PropTypes.string,

    /**
     * `data-param-text`: optional, defaults to: "Current page title - current
     * page URL"
     */
    text: PropTypes.string,

    /**
     * `data-param-url`: optional, defaults to: `rel=canonical` URL
     */
    url: PropTypes.number,

    /**
     * Width of item.
     */
    width: PropTypes.number
}

export default SocialShareItem
