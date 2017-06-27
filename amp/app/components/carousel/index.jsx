import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ampSDK from '../../amp-sdk'

// Components
import Button from '../button'

const carouselId = 'carousel-id'


class Carousel extends React.Component {

    constructor(props) {
        super(props)
    }

    calculateIndex(position, length) {
        const len = length || React.Children.count(this.props.children)

        // Always return a value within the array bounds. This
        // accounts for when the current position is either 0 or
        // length - 1.
        return position < 0 ? (len - (Math.abs(position) % len)) % len : position % len
    }

    calculateIndexes(position, length) {
        // Calculate the array index for the current item, as well as the previous and next.
        //
        // Optionally called with `length` when indices need to be recalculated due to number of
        // carousel children changing
        return {
            currentIndex: this.calculateIndex(position, length),
            prevIndex: this.calculateIndex(position - 1, length),
            nextIndex: this.calculateIndex(position + 1, length)
        }
    }

    render() {
        const {
            autoplay,
            delay,
            loop,
            height,
            width,
            className,
            controls,
            dataNextButtonAriaLabel,
            dataPrevButtonAriaLabel,
            layoutItem,
            showControls,
            typeCarousel,
            children
        } = this.props

        const classes = classNames('amp-carousel', className)
        const numChildren = React.Children.count(children)

        if (!numChildren) {
            return false
        }

        const layoutItemValue = layoutItem
        const controlsValue = controls ? {controls: ''} : {}
        const dataNextButtonAriaLabelValue = dataNextButtonAriaLabel ? {'data-next-button-aria-label': dataNextButtonAriaLabel} : {}
        const dataPrevButtonAriaLabelValue = dataPrevButtonAriaLabel ? {'data-prev-button-aria-label': dataPrevButtonAriaLabel} : {}
        const autoplayValue = autoplay ? {autoplay: ''} : {}
        const delayValue = delay ? {delay} : {}
        const loopValue = loop ? {loop: ''} : {}

        return (
            <div className={classes}>
                <div className="amp-carousel__inner">
                    <amp-carousel
                        id={carouselId}
                        type={typeCarousel}
                        layout={layoutItemValue}
                        height={height}
                        width={width}
                        {...controlsValue}
                        {...dataNextButtonAriaLabelValue}
                        {...dataPrevButtonAriaLabelValue}
                        {...autoplayValue}
                        {...delayValue}
                        {...loopValue}
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
                                    key={index}>
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
}

Carousel.propTypes = {
    /**
     * Specifies the height of the carousel, in pixels.
     */
    height: PropTypes.string.isRequired,

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
    layoutItem: PropTypes.oneOf(['fill', 'fixed', 'fixed-height', 'flex-item', 'nodisplay', 'responsive']),

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
    typeCarousel: (props) => {
        const {typeCarousel, layoutItem} = props
        const layoutSupported = (
            ((value === 'carousel') && ['fixed', 'fixed-height', 'nodisplay'].indexOf(layoutItem) >= 0) ||
            ((value === 'slides') && ['fill', 'fixed-height', 'flex-item', 'nodisplay', 'responsive'].indexOf(layoutItem) >= 0)
        )
        if (!layoutSupported) {
            return new Error(`Invalid combination of 'typeCarousel' and 'layoutItem'`)
        }
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
    typeCarousel: 'slides',
    layoutItem: 'responsive'
}

Carousel.scripts = [
    '<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>'
]

export default ampSDK.ampComponent(Carousel)
