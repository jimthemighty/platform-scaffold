import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {CURRENT_URL} from 'progressive-web-sdk/dist/store/app/constants'

// Components
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import AmpLightbox from '../../components/amp-lightbox'

// Selectors
import {getProductDescription, getProductTitle, getProductImages} from 'progressive-web-sdk/dist/store/products/selectors'
import {initProductDetailsPage} from 'progressive-web-sdk/dist/integration-manager/products/commands'
import {ampComponent} from '../../amp-sdk'

// Utils
import {staticURL} from '../../utils'

const ProductDetails = ({
    description,
    images,
    title
}) => (
    <div className="t-product-details">
        <div dangerouslySetInnerHTML={{__html: '<button on="tap:my-lightbox">Open lightbox</button>'}} />
        <AmpLightbox id="my-lightbox">
            <AmpImage src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" width="500" height="500" />
        </AmpLightbox>
        <AmpImage src={staticURL('mobify.png')} width="252" height="64" layout="fixed" />

        <h1>{title}</h1>
        <p>{description}</p>

        <AmpImage src={images[0].src} width="240" height="240" layout="fixed" alt={images[0].alt} />
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
    return dispatch(initProductDetailsPage(getState().app.get(CURRENT_URL)))
}]

ProductDetails.templateName = 'pdp'

const mapStateToProps = createPropsSelector({
    description: getProductDescription,
    images: getProductImages,
    title: getProductTitle
})

export default ampComponent(connect(mapStateToProps)(ProductDetails))
