import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ampSDK from '../../amp-sdk'

// Components
import AccordionItem from './accordion-item'

class Accordion extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // We need to use a copy of this prop so it doesn't get mutated
            openItems: [...props.initialOpenItems]
        }
    }

    render() {
        const {
            className,

            children,
            disableSessionState
        } = this.props

        const classes = classNames('amp-accordion', className)

        const disableSessionStateAttribute = disableSessionState ? 'true' : null

        return (
            <amp-accordion class={classes} role="tablist" disable-session-states={disableSessionStateAttribute}>
                {React.Children.map(children, (child, idx) => {
                    // If the user is using && to conditionally add a child
                    // the child could be undefined
                    if (child && child.type && child.type.name === AccordionItem.name) {
                        const childProps = {
                            shown: this.state.openItems.indexOf(idx) > -1,
                            key: idx
                        }

                        return React.cloneElement(child, childProps)
                    } else {
                        return child
                    }
                })}
            </amp-accordion>
        )
    }
}

Accordion.defaultProps = {
    disableSessionState: false,
    initialOpenItems: []
}

Accordion.propTypes = {
    /**
     * This list of <AccordionItem>s you'd like to display
     */
    children: PropTypes.node,

    /**
     * The CSS class/classes to be applied to the result
     */
    className: PropTypes.string,

    /**
     * Set this attribute on the <amp-accordion> to opt out of preserving the collapsed/expanded state of the accordion.
     */
    disableSessionState: PropTypes.boolean,

    /**
     * If an item should be open by default, include its index in this array
     */
    initialOpenItems: PropTypes.array
}

export default ampSDK.ampComponent(
    Accordion,
    '<script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>'
)
