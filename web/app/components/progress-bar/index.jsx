import React, {PropTypes} from 'react'
import classNames from 'classnames'

const componentClass = 'c-progress-bar'

/**
 * INSERT_DESCRIPTION_HERE
 */

const ProgressBar = ({
    percentage,
    className
}) => {
    const classes = classNames(componentClass, className, {
        // 'c--modifier': bool ? true : false
    })

    return (
        <div className={classes}>
            <div className="c-progress-bar__indicator" style={{width: percentage}}>{percentage}%</div>
        </div>
    )
}


ProgressBar.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    percentage: PropTypes.number.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default ProgressBar
