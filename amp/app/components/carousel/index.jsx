import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ampSDK from '../../amp-sdk'

import Button from '../button'
import Icon from '../icon'

const DIRECTION_RIGHT = 'right'
const DIRECTION_LEFT = 'left'

const getKey = (index) => {
    return `slide-${index}`
}

const CarouselButton = ({className, buttonClass, disabled, icon, iconSize, title}) => {
    return (
        <div className={className}>
            <Button className={buttonClass} disabled={disabled}>
                <Icon name={icon} size={iconSize} title={title} />
            </Button>
        </div>
    )
}

CarouselButton.propTypes = {
    buttonClass: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    iconSize: PropTypes.string,
    title: PropTypes.string
}

const CarouselPip = ({isCurrentPip, slideNumber}) => {
    const pipClasses = classNames('amp-carousel__pip', {
        'amp--active': isCurrentPip
    })

    return (
        <div className={pipClasses}>
            <span className="u-visually-hidden">
                {`${isCurrentPip ? 'Current slide' : 'Slide'} ${slideNumber}`}
            </span>
        </div>
    )
}

CarouselPip.propTypes = {
    isCurrentPip: PropTypes.bool,
    slideNumber: PropTypes.number
}

CarouselPip.displayName = 'CarouselPip'

class Carousel extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            ...this.calculateIndexes(props.currentSlide || 0), // Easy way to populate the prev/cur/next indexes
        }
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

    canMove(direction) {
        const {children, allowLooping} = this.props
        const {currentIndex} = this.state
        const slideCount = React.Children.count(children)

        // If we only have a single slide, it's safe to assume we shouldn't move
        if (slideCount === 1) {
            return false
        }

        // Determine if you can make a move in the given direction, this is used
        // for both disabling swiping and controls when not looping and you are
        // at the beginning or end of the item array.
        return allowLooping ||
            (direction === DIRECTION_LEFT && currentIndex > 0) ||
            (direction === DIRECTION_RIGHT && currentIndex !== slideCount - 1)
    }

    render() {
        const {
            className,
            previousIcon,
            nextIcon,
            iconSize,
            buttonClass,
            showCaption,
            showControls,
            typeCarousel
        } = this.props

        const {
            currentIndex,
            prevIndex,
            nextIndex
        } = this.state

        const {children} = this.props

        const classes = classNames('amp-carousel', className)

        if (!React.Children.count(children)) {
            return false
        }

        const slideCount = React.Children.count(children)

        // Handle the case where there is only a single child correctly
        let currentChild = children[currentIndex] || children
        currentChild = React.cloneElement(currentChild, {active: true, key: getKey(currentIndex)})

        // If we have only one child, prev and next can be null
        const prevChild = slideCount > 1
            ? React.cloneElement(children[prevIndex], {key: getKey(prevIndex)})
            : null

        // If we have two children, we need to have a dummy 'next' one,
        // so we'll clone the prev and give it a new key
        const nextChild = (() => {
            if (slideCount > 2) {
                return React.cloneElement(children[nextIndex], {key: getKey(nextIndex)})
            } else if (slideCount > 1 && prevChild) {
                return React.cloneElement(prevChild, {key: getKey(`${prevIndex}-duplicate`)})
            } else {
                return null
            }
        })()

        const childList = [prevChild, currentChild, nextChild]

        return (
            <amp-carousel class={classes} type={typeCarousel}>
                <div className="amp-carousel__inner" ref={(el) => { this._innerWrapper = el }}>
                    {childList.map((item) => item)}
                </div>

                {/* Optional 'caption' label control */}
                {showCaption &&
                    <span className={`amp-carousel__caption`}>
                        {currentChild.props.caption}
                    </span>
                }

                {showControls &&
                    <div className="amp-carousel__controls">
                        <CarouselButton
                            className="amp-carousel__previous"
                            disabled={!this.canMove(DIRECTION_LEFT)}
                            buttonClass={buttonClass}
                            icon={previousIcon}
                            iconSize={iconSize}
                            title={`Show slide ${prevIndex + 1} of ${slideCount}`}
                        />

                        <div className="amp-carousel__pips">
                            {React.Children.map(children, (item, index) =>
                                <CarouselPip
                                    isCurrentPip={index === currentIndex}
                                    slideNumber={index + 1}
                                    key={index}
                                />
                            )}
                        </div>

                        <CarouselButton
                            className="amp-carousel__next"
                            disabled={!this.canMove(DIRECTION_RIGHT)}
                            buttonClass={buttonClass}
                            icon={nextIcon}
                            iconSize={iconSize}
                            title={`Show slide ${nextIndex + 1} of ${slideCount}`}
                        />
                    </div>
                }
            </amp-carousel>
        )
    }
}

Carousel.propTypes = {
    /**
     * AllowLooping will cause the carousel to start at the beginning on the next move
     * when the end is reached.
     */
    allowLooping: PropTypes.bool,

    /**
     * Adds values to the `class` attribute for the Previous/Next buttons
     */
    buttonClass: PropTypes.string,

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
     * The index of the current slide. This prop can be used to set the active slide to an index of your choice.
     */
    currentSlide: PropTypes.number,

    /**
     * Icon size for the Previous/Next buttons
     */
    iconSize: PropTypes.string,

    /**
     * Icon name for the "Next Button"
     */
    nextIcon: PropTypes.string,

    /**
     * Icon name for the "Previous Button"
     */
    previousIcon: PropTypes.string,

    /**
     * Boolean value to show slide caption or not. The caption is read
     * from the props of the current CarouselItem.
     */
    showCaption: PropTypes.bool,

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
    typeCarousel: PropTypes.oneOf(['carousel', 'slides']),
}

Carousel.defaultProps = {
    allowLooping: false,
    iconSize: 'small',
    nextIcon: 'caret-circle-right',
    previousIcon: 'caret-circle-left',
    showCaption: false,
    showControls: true,
    typeCarousel: 'carousel'
}

export default ampSDK.ampComponent(
    Carousel,
    '<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>'
)
