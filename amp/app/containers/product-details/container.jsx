import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'

// Components
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import AmpLightbox from '../../components/amp-lightbox'
import ProductDetailsHeading from './partials/product-details-heading'

// Selectors
import {getProductDescription, getProductTitle, getProductImages} from '../../../../web/app/store/products/selectors'
import {initProductDetailsPage} from '../../../../web/app/integration-manager/products/commands'
import {ampComponent} from '../../amp-sdk'

// Utils
import {staticURL} from '../../utils'

const ProductDetails = ({
    description,
    images,
    title
}) => {

    return (
        <div className="t-product-details">

            <ProductDetailsHeading isInCheckout={false}/>
            <p>{description}</p>

            <AmpImage src={images[0].src} width="240" height="240" layout="fixed" alt={images[0].alt} />
        </div>
    )
}
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

export default ampComponent(connect(mapStateToProps)(ProductDetails))
