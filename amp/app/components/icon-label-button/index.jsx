import React, {PropTypes} from 'react'
import classNames from 'classnames'
import Button from '../button'
import IconLabel from '../icon-label'
import {ampComponent} from '../../amp-sdk'


const IconLabelButton = (props) => {
    const {
        // Values
        href,
        iconName,
        label,

        // Attributes
        id,
        className,
        disabled,
        name,
        value,
        role,
        on
    } = props

    const classes = classNames('c-icon-label-button', className)

    const attrs = {
        href, id, on, disabled, name, value, role,
        className: classes
    }

    // Add all aria attributes
    Object.keys(props).forEach((key) => {
        if (/^aria-/.test(key)) {
            attrs[key] = props[key]
        }
    })

    return (
        <Button className={classes} innerClassName="u-padding-0" {...attrs}>
            <IconLabel label={label} iconName={iconName} />
        </Button>
    )
}


IconLabelButton.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Pass "true" if you would like button to be disabled
     */
    disabled: PropTypes.bool,

    /**
     * If specified, the component is rendered as a link, with this value set as the href
     */
    href: PropTypes.string,

    /**
     * Name of Icon
     */
    iconName: React.PropTypes.string,

    /**
     * Sets the `id` attribute of the root element
     */
    id: PropTypes.string,

    /**
     * Label for IconLabel
     */
    label: React.PropTypes.string,

    /**
     * The button's `name` attribute
     */
    name: PropTypes.string,

    /**
     * Use for AMP's event handlers on elements.
     */
    on: PropTypes.string,

    /**
     * The button's `role` attribute
     */
    role: PropTypes.string,

    /**
     * The button's `value` attribute
     */
    value: PropTypes.string
}


export default ampComponent(IconLabelButton)
