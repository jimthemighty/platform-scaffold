import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

// Components
import Icon from '../icon'

/**
 * An icon and label combination. If no iconSize is passed in, the default will be medium
 */

const IconLabel = ({
    className,
    iconName,
    iconSize,
    label
}) => {

    const classes = classNames('amp-icon-label', className)

    return (
        <div className={classes}>
            <Icon name={iconName} size={iconSize} />
            <span className="amp-icon-label__label">{label}</span>
        </div>
    )
}


IconLabel.defaultProps = {
    iconSize: 'medium'
}

IconLabel.propTypes = {
    /**
     * The name of the icon to be used in the IconLabel
     */
    iconName: PropTypes.string.isRequired,

    /**
     * The label text to be used in the IconLabel
     */
    label: PropTypes.string.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Add size of icon (normally, one of `small`, `medium`, or `large`). Default is `medium`
     */
    iconSize: PropTypes.string

}

export default ampComponent(IconLabel)
