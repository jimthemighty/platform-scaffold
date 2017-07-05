import React from 'react'
import {ampComponent} from 'mobify-amp-sdk/dist/amp-sdk'
import {CURRENT_URL} from 'progressive-web-sdk/dist/store/app/constants'
import {initProductDetailsPage} from 'progressive-web-sdk/dist/integration-manager/products/commands'

// Partials
import ProductDetailsHeading from './partials/product-details-heading'
import ProductDetailsCarousel from './partials/product-details-carousel'
import ProductDetailsAddToCart from './partials/product-details-add-to-cart'
import ProductDetailsDescription from './partials/product-details-description'

const ProductDetails = () => {
    return (
        <div className="t-product-details">
            <ProductDetailsHeading />
            <ProductDetailsCarousel />
            <ProductDetailsAddToCart />
            <ProductDetailsDescription />
        </div>
    )
}

ProductDetails.resolves = [({dispatch, getState}) => {
    return dispatch(initProductDetailsPage(getState().app.get(CURRENT_URL)))
}]

ProductDetails.templateName = 'pdp'

export default ampComponent(ProductDetails)
