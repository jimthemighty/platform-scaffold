import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Components
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Carousel from '../../../components/carousel'

// Selectors
import {getProductImages} from 'progressive-web-sdk/dist/store/products/selectors'

const ProductDetailsCarousel = ({images}) => {

    return (
        <Carousel
            id="product-details-carousel"
            className="a--frame a--side-controls t-product-details__carousel u-padding-md u-bg-color-neutral-10"
            height="330"
            width="330"
        >
            {images.map(({src, alt = ''}) => (
                <AmpImage
                    className="u-display-block"
                    height="330"
                    width="330"
                    alt={alt}
                    src={src}
                    key={src} />
            ))}
        </Carousel>
    )
}

ProductDetailsCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string
    })).isRequired
}

const mapStateToProps = createPropsSelector({
    images: getProductImages
})

export default connect(mapStateToProps)(ProductDetailsCarousel)
