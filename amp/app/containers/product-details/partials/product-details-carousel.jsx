import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getProductImages} from '../../../../../web/app/store/products/selectors'

// Components
import Carousel from '../../../components/carousel'
import AmpImage from '../../../components/amp-image'

const ProductDetailsCarousel = ({images}) => {
    const carouselProps = {
        previousIcon: 'chevron-left',
        nextIcon: 'chevron-right',
        iconSize: 'medium',
        className: 'amp--frame amp--side-controls t-product-details__carousel u-padding-md u-bg-color-neutral-10',
        showControls: images.length > 1,
        height: '330px',
        width: '330px',
        dataNextButtonAriaLabel: 'HELLO WORLD',
        dataPrevButtonAriaLabel: 'BYE BYE'
    }

    const imgProps = {
        className: 'u-display-block',
        height: '330px',
        width: '330px'
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
