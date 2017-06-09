import React, {PropTypes} from 'react'
import classNames from 'classnames'
import Link from '../link'
import Icon from '../icon'

/**
 * A styleable, accessible `<button>` component for [Mobify’s Progressive Web SDK](#).
 */

const Button = (props) => {
    const {
        // Values
        href,
        icon,
        iconSize,
        iconClassName,
        innerClassName,
        showIconText,
        text,
        title,
        type,

        // Attributes
        id,
        className,
        disabled,
        name,
        value,
        role,
        openInNewTab,
        on
    } = props

    const classes = classNames('amp-button', {
        'amp--anchor c--anchor': !!href,
        'amp--icon-only c--icon-only': !!icon && !props.children
    }, className)
    const innerClass = classNames('amp-button__inner', innerClassName)
    const iconClass = classNames('amp-button__icon', iconClassName, {
        'amp--has-siblings c--has-siblings': props.children || (title && showIconText)
    })
    const textClass = classNames('amp-button__text', {
        'u-visually-hidden': !showIconText
    })
    const attrs = {
        href, id, on, disabled, name, value, role,
        className: classes, is: true
    }

    let children

    if (icon) {
        children = [
            <Icon className={iconClass} size={iconSize} name={icon} key="autoicon" />,
            title && <span className={textClass} key="autotitle">{title}</span>
        ]

        if (typeof props.children === 'string') {
            children.push(props.children)
        } else {
            children.push(
                ...(props.children || [])
            )
        }
    } else {
        children = text || props.children
    }

    // Add all aria attributes
    Object.keys(props).forEach((key) => {
        if (/^aria-/.test(key)) {
            attrs[key] = props[key]
        }
    })

    if (href) {
        return (
            <Link {...attrs} openInNewTab={openInNewTab}>
                <div className={innerClass}>{children}</div>
            </Link>
        )
    } else {
        return (
            <button is {...attrs} type={type}>
                <div className={innerClass}>{children}</div>
            </button>
        )
    }
}

Button.defaultProps = {
    type: 'button'
}

Button.propTypes = {
    /**
     * Any children to be nested within this button
     */
    children: PropTypes.node,

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
     * If specified, includes an icon of the given name in the button
     */
    icon: PropTypes.string,

    /**
    * Adds values to the class attribute in <Icon> component
    */
    iconClassName: PropTypes.string,

    /**
     * If specified, will set the icon to the size of your choice
     */
    iconSize: PropTypes.string,

    /**
     * Sets the `id` attribute of the root element
     */
    id: PropTypes.string,

    /**
    * Adds values to the class attribute of the inner container
    */
    innerClassName: PropTypes.string,

    /**
     * The button's `name` attribute
     */
    name: PropTypes.string,

    /**
     * Use for AMP's event handlers on elements.
     */
    on: PropTypes.string,

    /**
     * For use with Buttons with an href set.
     *
     * If true, target="_blank" will be added to the button.
     * Only use this property if you trust the link! https://mathiasbynens.github.io/rel-noopener
     */
    openInNewTab: PropTypes.bool,

    /**
     * The button's `role` attribute
     */
    role: PropTypes.string,

    /**
    * For use when the icon and title attributes have been defined
    * If true the title attribute will be wrapped in a container with the class
    * `amp-button c-button__text`, if false the wrapper's class will be
    * `u-visually-hidden`
    */
    showIconText: PropTypes.bool,

    /**
     * Text contents of the button
     */
    text: PropTypes.string,

    /**
     * The title to be used for accessibility (generally if `icon` is used)
     */
    title: PropTypes.string,

    /**
     * Specifies button type, defaults to `button`.
     */
    type: PropTypes.oneOf(['button', 'submit']),

    /**
     * The button's `value` attribute
     */
    value: PropTypes.string
}

export default Button
