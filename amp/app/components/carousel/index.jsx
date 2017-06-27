import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ampSDK from '../../amp-sdk'

// Components
import Button from '../button'

const onlyDefined = (obj) => {
    const ret = {}
    Object.keys(obj).forEach((k) => {
        if (obj[k] !== undefined) {
            ret[k] = obj[k]
        }
    })
    return ret
}

const Carousel = (props) => {

    const {
        id,
        autoplay,
        delay,
        loop,
        height,
        width,
        className,
        controls,
        dataNextButtonAriaLabel,
        dataPrevButtonAriaLabel,
        layout,
        showControls,
        type,
        children
    } = props

    const classes = classNames('amp-carousel', className)
    const numChildren = React.Children.count(children)

    const carouselId = id

    if (!numChildren) {
        return false
    }

    const attrs = onlyDefined({
        autoplay: autoplay ? '' : undefined,
        loop: loop ? '' : undefined
    })

    return (
        <div className={classes}>
            <div className="amp-carousel__inner">
                <amp-carousel
                    id={carouselId}
                    type={type}
                    layout={layout}
                    height={height}
                    width={width}
                    controls={controls}
                    data-next-button-aria-label={dataNextButtonAriaLabel}
                    data-prev-button-aria-label={dataPrevButtonAriaLabel}
                    delay={delay}
                    {...attrs}
                >
                    {children}
                </amp-carousel>
            </div>

            {showControls &&
                <div className="amp-carousel__controls">
                    <div className="amp-carousel__pips">
                        {React.Children.map(children, (item, index) => (
                            <Button
                                className="amp-carousel__pip"
                                on={`tap:${carouselId}.goToSlide(index=${index})`}
                                key={index}
                            >
                                <span className="u-visually-hidden">
                                    Slide {index + 1}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

Carousel.propTypes = {
    /**
     * Specifies the height of the carousel, in pixels.
     */
    height: PropTypes.string.isRequired,

    /**
     * Give unique ID to carousel to work with controls.
     */
    id: PropTypes.string.isRequired,

    /**
     * Advances the slide to the next slide without user interaction. By
     * default, advances a slide in 5000 millisecond intervals (5 seconds); this
     * can be overridden by the delay attribute.
     */
    autoplay: PropTypes.bool,

    /**
     * The CarouselItems to display.
     *
     * Because of the way this component handles animation,
     * only 3 will ever be rendered at a time
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Displays left and right arrows for the user to navigate carousel
     * items on mobile devices.
     */
    controls: PropTypes.bool,

    /**
     * The index of the current slide. This prop can be used to set the active slide to an index of your choice.
     */
    currentSlide: PropTypes.number,

    /**
     * Sets the aria-label for the `amp-carousel-button-next`. If no value is
     * given, the aria-label defaults to 'Next item in carousel'.
     */
    dataNextButtonAriaLabel: PropTypes.string,

    /**
     * Sets the aria-label for the `amp-carousel-button-prev`. If no value is
     * given, the aria-label defaults to 'Previous item in carousel'.
     */
    dataPrevButtonAriaLabel: PropTypes.string,

    /**
     * Specifies the duration (in milliseconds) to delay advancing to the next
     * slide when `autoplay` is enabled. The `delay` attribute is only applicable
     * to carousels with `type=slides`.
     */
    delay: PropTypes.number,

    /**
     * Specifies the display type for the carousel items
     */
    layout: PropTypes.oneOf(['fill', 'fixed', 'fixed-height', 'flex-item', 'nodisplay', 'responsive']),

    /**
     * Allows the user to advance past the first item or the final item. There
     * must be at least 3 slides for looping to occur. The loop attribute is
     * only applicable to carousels with type=slides.
     */
    loop: PropTypes.bool,

    /**
     * Boolean value to show carousel controls and pips or not
     */
    showControls: PropTypes.bool,

    /**
     * carousel: All slides are shown and are scrollable horizontally. This
     * type supports only the following layouts: `fixed`, `fixed-height`, and
     * `nodisplay`.
     *
     * slides: Shows a single slide at a time. This type supports the
     * following layouts: `fill`, `fixed`, `fixed-height`, `flex-item`,
     * `nodisplay`, and `responsive`.
     */
    type: (props) => {
        const {type, layout} = props
        const layoutSupported = (
            ((type === 'carousel') && ['fixed', 'fixed-height', 'nodisplay'].indexOf(layout) >= 0) ||
            ((type === 'slides') && ['fill', 'fixed-height', 'flex-item', 'nodisplay', 'responsive'].indexOf(layout) >= 0)
        )
        return !layoutSupported ? new Error(`Invalid combination of 'type' and 'layout'`) : undefined
    },


    /**
     * Specifies the width of the carousel, in pixels.
     */
    width: PropTypes.number
}

Carousel.defaultProps = {
    loop: false,
    controls: false,
    showControls: false,
    type: 'slides',
    layout: 'responsive'
}

Carousel.scripts = [
    '<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>'
]

export default ampSDK.ampComponent(Carousel)
