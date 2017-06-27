import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getProductImages} from '../../../../web/app/store/products/selectors'
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

const mapStateToProps = createPropsSelector({
    images: getProductImages
})

export default connect(mapStateToProps)(ProductDetails)
