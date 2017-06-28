import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {ampComponent} from '../../amp-sdk'

const uuid = (() => {
    let i = 0
    return () => i++
})()

class Icon extends React.Component {
    constructor(props) {
        super(props)

        this.id = `icon-${uuid()}`
    }

    render() {
        const {
            prefix,
            name,
            title,
            size,
            className,
            style
        } = this.props

        const a11y = (title.length) ? {role: 'img'} : {'aria-hidden': 'true'}
        const sizeClass = `amp--${size}`

        const classes = classNames('amp-icon', {
            [sizeClass]: !!size
        }, className)

        return (
            <svg {...a11y}
                className={classes}
                title={title}
                aria-labelledby={this.id}
                style={style}
            >
                <title id={this.id}>{title}</title>
                <use role="img" xlinkHref={`#${prefix}-${name}`} />
            </svg>
        )
    }
}

Icon.defaultProps = {
    name: '',
    title: '',
    prefix: 'amp',
    style: {}
}

Icon.propTypes = {
    /**
     * Identifier for the desired icon. Usually the filename, sans its prefix.
     * For example, if the target icon is `amp-chevron-up.svg`, the name
     * is `chevron-up`.
     */
    name: PropTypes.string.isRequired,
    /**
     * Custom `className` attribute.
     */
    className: PropTypes.string,
    /**
     * The prefix is the first part of the icon name/id. If you're using a
     * different icon set, the prefix may need to be modified.
     */
    prefix: PropTypes.string,
    /**
     * The size of the icon, controlled by CSS.
     */
    size: PropTypes.string,
    /**
     * Custom `style` attribute.
     */
    style: PropTypes.object,
    /**
     * **Beware** that ommitting a `title` will leave the icon **invisible** to
     * screen readers. If included, screen readers will read and treat the
     * icon like an image with alt text.
     */
    title: PropTypes.string
}

export default ampComponent(Icon)