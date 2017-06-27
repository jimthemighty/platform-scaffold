import React from 'react'
import {ampComponent} from '../../amp-sdk'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'
import {initProductDetailsPage} from '../../../../web/app/integration-manager/products/commands'

// Partials
import ProductDetailsDescription from './partials/product-details-description'

const ProductDetails = () => (
    <div className="t-product-details">
        <ProductDetailsDescription />
    </div>
)

ProductDetails.resolves = [({dispatch, getState}) => {
    return dispatch(initProductDetailsPage(getState().ui.app.get(CURRENT_URL)))
}]

ProductDetails.templateName = 'pdp'

export default ampComponent(ProductDetails)
