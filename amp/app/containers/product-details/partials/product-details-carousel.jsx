import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getProductImages} from '../../../../../web/app/store/products/selectors'

import Carousel from '../../../components/carousel'
import CarouselItem from '../../../components/carousel/carousel-item'
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'

const ProductDetailsCarousel = ({images}) => {
    const carouselProps = {
        previousIcon: 'chevron-left',
        nextIcon: 'chevron-right',
        iconSize: 'medium',
        className: 'amp--frame amp--side-controls t-product-details__carousel u-padding-md u-bg-color-neutral-10',
        showControls: images.length > 1,
        height: '330px',
        controls: true,
        dataNextButtonAriaLabel: 'HELLO WORLD',
        dataPrevButtonAriaLabel: 'BYE BYE',
        autoplay: true,
        delay: 3000,
        loop: true
    }

    const imgProps = {
        className: 'u-display-block',
        hidePlaceholder: true,
        ratio: {aspect: '1:1'},
        useLoaderDuringTransitions: false,
        height: '330px'
    }

    return (
        <Carousel {...carouselProps}>
            {images.map(({src, alt = ''}) => {
                return (
                    <CarouselItem key={src}>
                        <AmpImage {...imgProps} alt={alt} src={src} />
                    </CarouselItem>
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
