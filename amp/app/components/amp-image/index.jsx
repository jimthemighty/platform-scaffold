import React, {PropTypes} from 'react'
import classNames from 'classnames'

/**
 * AmpImage Component
 */

const AmpImage = ({
    alt,
    className,
    height,
    layout,
    src,
    width,
}) => {
    const classes = classNames('amp-image', className)

    const imageProps = {
        class: classes,
        src,
        alt,
        height,
        layout,
        width
    }

    /* eslint-disable react/self-closing-comp */
    return (
        <amp-img {...imageProps}></amp-img>
    )
}

AmpImage.defaultProps = {
    alt: '',
    layout: 'responsive',
    height: '',
    src: '',
    width: ''
}

AmpImage.propTypes = {
    /**
     * This attribute defines the alternative text describing the image.
     */
    alt: PropTypes.string.isRequired,

    /**
     * The intrinsic height of the image in HTML5 CSS pixels, or HTML 4 in pixels or as a percentage.
     */
    height: PropTypes.string.isRequired,

    /**
     * The image URL.
     */
    src: PropTypes.string.isRequired,

    /**
     * The intrinsic width of the image in HTML5 CSS pixels, or HTML 4 in pixels or as a percentage.
     */
    width: PropTypes.string.isRequired,

    /**
     * A CSS class name to be applied to the enclosing <div /> element.
     */
    className: PropTypes.string,

    /**
     * The AMP layout property https://www.ampproject.org/docs/guides/responsive/control_layout
     */
    layout: PropTypes.string,

}

export default AmpImage
