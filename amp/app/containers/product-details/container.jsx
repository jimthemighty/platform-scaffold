import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import AmpLightbox from '../../components/amp-lightbox'
import {staticURL} from '../../utils'
import containerStyles from './container.scss'

import {createPropsSelector} from 'reselect-immutable-helpers'
import {getProductDescription, getProductTitle, getProductImages} from '../../../../web/app/store/products/selectors'
import {initProductDetailsPage} from '../../../../web/app/integration-manager/products/commands'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'

const containerClass = 't-product-details'

const ProductDetails = ({
    description,
    images,
    title
}) => (
    <div className={containerClass}>
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
