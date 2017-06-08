import React, {PropTypes} from 'react'
import classNames from 'classnames'
import Link from '../link'
import Icon from '../icon'
import DangerousHTML from '../dangerous-html'

/**
 * A styleable, accessible `<button>` component for [Mobify’s Progressive Web SDK](#).
 */
class Button extends React.Component {
    render() {
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
        } = this.props

        const classes = classNames('amp-button', {
            'amp--anchor c--anchor': !!href,
            'amp--icon-only c--icon-only': !!icon && !this.props.children
        }, className)
        const innerClass = classNames('amp-button__inner', innerClassName)
        const iconClass = classNames('amp-button__icon', iconClassName, {
            'amp--has-siblings c--has-siblings': this.props.children || (title && showIconText)
        })
        const textClass = classNames('amp-button__text', {
            'u-visually-hidden': !showIconText
        })
        const linkAttrs = {
            href, id, disabled, name, value, role,
            className: classes
        }

        const buttonAttrs = {
            href, id, on, disabled, name, value, role,
            class: classes
        }

        let children

        if (icon) {
            children = [
                <Icon className={iconClass} size={iconSize} name={icon} key="autoicon" />,
                title && <span className={textClass} key="autotitle">{title}</span>
            ]

            if (typeof this.props.children === 'string') {
                children.push(this.props.children)
            } else {
                children.push(
                    ...(this.props.children || [])
                )
            }
        } else {
            children = text || this.props.children
        }

        // Add all aria attributes for <a> element
        Object.keys(this.props).forEach((key) => {
            if (/^aria-/.test(key)) {
                linkAttrs[key] = this.props[key]
            }
        })

        // Add all aria attributes for <button> element
        Object.keys(this.props).forEach((key) => {
            if (/^aria-/.test(key)) {
                buttonAttrs[key] = this.props[key]
            }
        })

        // Combine all button attributes into a string to use DangerousHTML
        const buttonAttrText = Object.keys(buttonAttrs).reduce((result, key) => {
            return buttonAttrs[key] ? `${key}=${buttonAttrs[key]} ${result}` : result
        }, '')

        const buttonOutput = `<button ${buttonAttrText} type=${type}><div class="${innerClass}">${children}</div></button>`

        if (href) {
            return (
                <Link {...linkAttrs} openInNewTab={openInNewTab}>
                    <div className={innerClass}>{children}</div>
                </Link>
            )
        } else {
            return (
                // Output DangerousHTML because with React cannot output custom attributes
                <DangerousHTML html={buttonOutput}>
                    {(htmlObj) => <div dangerouslySetInnerHTML={htmlObj} />}
                </DangerousHTML>
            )
        }
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
