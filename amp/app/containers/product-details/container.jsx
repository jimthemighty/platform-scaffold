import React from 'react'
import {ampComponent} from '../../amp-sdk'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'

// Selectors
import {initProductDetailsPage} from '../../../../web/app/integration-manager/products/commands'

// Partials
import ProductDetailsCarousel from './partials/product-details-carousel'

const ProductDetails = () => (
    <div className="t-product-details">
        <ProductDetailsCarousel />
    </div>
)

ProductDetails.resolves = [({dispatch, getState}) => {
    return dispatch(initProductDetailsPage(getState().ui.app.get(CURRENT_URL)))
}]

ProductDetails.templateName = 'pdp'

export default ampComponent(ProductDetails)
