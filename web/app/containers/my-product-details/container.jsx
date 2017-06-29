/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import Button from 'progressive-web-sdk/dist/components/button'
import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Image from 'progressive-web-sdk/dist/components/image'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import {getProductAvailability, getProductPrice, getProductTitle, getProductDescription, getProductImages} from 'progressive-web-sdk/dist/store/products/selectors'

import {addProductToCart} from './actions'

const containerClass = 't-my-product-details'
const titleClass = `${containerClass}__title`

const MyProductDetails = ({available, description, images, price, title, onAddToCart}) => {
    return (
        <div className={containerClass}>
            <h1 className={titleClass}>{title}</h1>
            <h2>Available: {available ? 'Yes' : 'No'}</h2>
            <h2>Price: {price}</h2>
            <div>{description}</div>
            {images.length > 0 ?
                <Carousel>
                    {images.map(({src, alt = ''}) => {
                        return (
                            <CarouselItem key={src}>
                                <Image alt={alt} src={src} />
                            </CarouselItem>
                        )
                    })}
                </Carousel>
            :
                <SkeletonBlock height="100px" />
            }
            <Button className="c--primary" onClick={onAddToCart}>Add to Cart</Button>
        </div>
    )
}

MyProductDetails.propTypes = {
    available: PropTypes.bool,
    description: PropTypes.string,
    images: PropTypes.array,
    price: PropTypes.string,
    title: PropTypes.string,
    onAddToCart: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    available: getProductAvailability,
    description: getProductDescription,
    images: getProductImages,
    price: getProductPrice,
    title: getProductTitle
})

const mapDispatchToProps = {
    onAddToCart: addProductToCart
}

export default template(connect(mapStateToProps, mapDispatchToProps)(MyProductDetails))
