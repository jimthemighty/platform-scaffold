import React, {PropTypes} from 'react'

// This component is for internal use only within the AccordionItem

const AccordionItemContent = ({
    children
}) => {
    return (
        <div className="amp-accordion__content-wrapper">
            <div className="amp-accordion__content" role="presentation">
                {children}
            </div>
        </div>
    )
}

AccordionItemContent.propTypes = {
    /**
     * PROVIDED INTERNALLY. Whatever you'd like this AccordionItem to display.
     */
    children: PropTypes.node
}

export default AccordionItemContent
