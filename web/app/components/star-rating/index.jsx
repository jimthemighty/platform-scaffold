import React, {PropTypes} from 'react'
import classNames from 'classnames'

const componentClass = 'c-star-rating'

/**
 * INSERT_DESCRIPTION_HERE
 */

const StarRating = ({
    numStars,
    className
}) => {
    const classes = classNames(componentClass, className, {
        // 'c--modifier': bool ? true : false
    })

    return (
        <div className={classes}>
            <span className={numStars === 5 ? `${componentClass}-star c--filled-in` : `${componentClass}-star`}>☆</span>
            <span className={numStars >= 4 ? `${componentClass}-star c--filled-in` : `${componentClass}-star`}>☆</span>
            <span className={numStars >= 3 ? `${componentClass}-star c--filled-in` : `${componentClass}-star`}>☆</span>
            <span className={numStars >= 2 ? `${componentClass}-star c--filled-in` : `${componentClass}-star`}>☆</span>
            <span className={numStars >= 1 ? `${componentClass}-star c--filled-in` : `${componentClass}-star`}>☆</span>
        </div>
    )
}

StarRating.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    numStars: PropTypes.number.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default StarRating
