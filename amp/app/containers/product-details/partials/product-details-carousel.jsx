import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getProductImages} from '../../../../../web/app/store/products/selectors'

// Components
import Carousel from '../../../components/carousel'
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'

const ProductDetailsCarousel = ({images}) => {
    const carouselProps = {
        id: 'product-details-carousel',
        previousIcon: 'chevron-left',
        nextIcon: 'chevron-right',
        className: 'amp--frame amp--side-controls t-product-details__carousel u-padding-md u-bg-color-neutral-10',
        showControls: images.length > 1,
        height: '330',
        width: '330'
    }

    const imgProps = {
        className: 'u-display-block',
        height: '330',
        width: '330'
    }

    return (
        <Carousel {...carouselProps}>
            {images.map(({src, alt = ''}) => {
                return (
                    <AmpImage {...imgProps} alt={alt} src={src} key={src} />
                )
            })}
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
