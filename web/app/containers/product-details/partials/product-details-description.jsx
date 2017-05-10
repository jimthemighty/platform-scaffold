import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'

import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'

const ProductDetailsDescription = ({description}) => (
    <Accordion className="t-product-details__description" initialOpenItems={[0]}>
        <AccordionItem header="Product Description" closeIconName="close" openIconName="plus">
            <p>{description}</p>
        </AccordionItem>
    </Accordion>
)

ProductDetailsDescription.propTypes = {
    description: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    description: selectors.getProductDescription
})

export default connect(mapStateToProps)(ProductDetailsDescription)
