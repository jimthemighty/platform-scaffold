import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Carousel from '../../components/carousel'
import CarouselItem from '../../components/carousel/carousel-item'

import {staticURL} from '../../utils'
import containerStyles from './container.scss'

import {createPropsSelector} from 'reselect-immutable-helpers'
import {getProductDescription, getProductTitle, getProductImages} from '../../../../web/app/store/products/selectors'
import {initProductDetailsPage} from '../../../../web/app/integration-manager/products/commands'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'

import ProductDetailsCarousel from './partials/product-details-carousel'

const ProductDetails = () => (
    <div className="t-product-details">
        <h1>Hello World</h1>

        <ProductDetailsCarousel />
    </div>
)

ProductDetails.propTypes = {
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string
    })).isRequired,
    title: PropTypes.string.isRequired
}

ProductDetails.resolves = [({dispatch, getState}) => {
    return dispatch(initProductDetailsPage(getState().ui.app.get(CURRENT_URL)))
}]

ProductDetails.templateName = 'pdp'

const mapStateToProps = createPropsSelector({
    description: getProductDescription,
    images: getProductImages,
    title: getProductTitle
})

export const styles = containerStyles.toString()

export default connect(
    mapStateToProps
)(ProductDetails)
