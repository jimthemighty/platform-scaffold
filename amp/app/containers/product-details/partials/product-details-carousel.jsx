import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Components
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Carousel from '../../../components/carousel'

// Selectors
import {getProductImages} from '../../../../../web/app/store/products/selectors'

const ProductDetailsCarousel = ({images}) => {

    return (
        <Carousel
            id="product-details-carousel"
            previousIcon="chevron-left"
            nextIcon="chevron-right"
            className="amp--frame amp--side-controls t-product-details__carousel u-padding-md u-bg-color-neutral-10"
            showControls={images.length > 1}
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
