/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Components
import {Accordion, AccordionItem} from 'mobify-amp-sdk/dist/components/accordion'
import SocialShare from '../../../components/social-share'

// Selectors
import {getProductDescription} from 'progressive-web-sdk/dist/store/products/selectors'

const foo = [{type: 'twitter', url: 'someURLhere', text: 'some text here'}]

const ProductDetailsDescription = ({description}) => (
    <div className="u-padding-top-md u-bg-color-neutral-10">
        <SocialShare options={foo} />

        <Accordion className="t-product-details__description u-bg-color-neutral-00" initialOpenItems={[0]}>
            <AccordionItem header="Product Description" closeIconName="close" openIconName="plus">
                <p>{description}</p>
            </AccordionItem>
        </Accordion>
    </div>
)

ProductDetailsDescription.propTypes = {
    description: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    description: getProductDescription
})

export default connect(mapStateToProps)(ProductDetailsDescription)
