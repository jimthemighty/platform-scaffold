/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Components
import {Accordion, AccordionItem} from 'mobify-amp-sdk/dist/components/accordion'

// Selectors
import {getProductDescription} from 'progressive-web-sdk/dist/store/products/selectors'

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
    description: getProductDescription
})

export default connect(mapStateToProps)(ProductDetailsDescription)