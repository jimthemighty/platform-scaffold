import React, {PropTypes} from 'react'
import classNames from 'classnames'

// Components
import Icon from '../icon'
import AccordionItemContent from './accordion-item-content'

const uuid = (() => {
    let i = 0
    return () => {
        return i++
    }
})()

class AccordionItem extends React.Component {
    constructor(props) {
        super(props)

        this.id = uuid()
        this.itemId = `accordion__item-${this.id}`
    }

    render() {
        const {
            children,
            className,
            shown,
            header,
            headingLevel,
            openIconName,
            closeIconName,
            iconSize,
            iconPosition,
            isOpen
        } = this.props

        const classes = classNames('amp-accordion__item', {
            'amp-accordion--is-open': shown
        }, className)

        const headerId = `accordion__header-${this.id}`

        const HeadingTag = `h${headingLevel}`

        const expandedItem = isOpen ? 'true' : null

        return (
            <section className={classes} expanded={expandedItem} id={this.itemId} ref={(el) => { this._container = el }}>
                <HeadingTag className="amp-accordion__header" id={headerId}>
                    <div className={`amp-accordion__inner-header amp--icon-${iconPosition}`}>
                        <div className="amp-accordion__icon" aria-hidden="true">
                            <div className="amp-accordion__open-icon">
                                <Icon className="amp-accordion__glyph" size={iconSize} name={openIconName} />
                            </div>

                            <div className="amp-accordion__close-icon">
                                <Icon className="amp-accordion__glyph" size={iconSize} name={closeIconName} />
                            </div>
                        </div>

                        <div className="amp-accordion__title">
                            {header}
                        </div>
                    </div>
                </HeadingTag>

                <AccordionItemContent>
                    {children}
                </AccordionItemContent>
            </section>
        )
    }
}

AccordionItem.defaultProps = {
    closeIconName: 'minus',
    iconPosition: 'start',
    openIconName: 'plus',
    headingLevel: 3
}

AccordionItem.propTypes = {
    /**
     * Whatever you'd like this AccordionItem to display.
     *
     * This can also include more Accordions.
     */
    children: PropTypes.node,

    /**
     * The CSS class/classes to be applied to the result
     */
    className: PropTypes.string,

    /**
     * The name of the icon shown in the header
     * when the accordion can be closed
     */
    closeIconName: PropTypes.string,

    /**
     * The content that should be displayed as the header
     */
    header: PropTypes.node,

    /**
     * The first child (of the section) represents the heading for the section and must be a heading element (one of h1, h2, ..., h6).
     */
    headingLevel: PropTypes.number,

    /**
     * Determines whether the icons should be placed before or after the title.
     */
    iconPosition: PropTypes.oneOf(['start', 'end']),

    /**
     * Passes a custom className to the Accordion Item's icon
     */
    iconSize: PropTypes.string,

    /**
     *
     */
    isOpen: PropTypes.boolean,

    /**
     * The name of the icon shown in the header
     * when the accordion can be opened
     */
    openIconName: PropTypes.string,

    /**
     * PROVIDED INTERNALLY. This is used by Accordion to open and close the items
     */
    shown: PropTypes.bool
}

export default AccordionItem
