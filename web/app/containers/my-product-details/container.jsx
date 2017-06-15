/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Image from 'progressive-web-sdk/dist/components/image'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import {getProductTitle, getProductDescription, getProductImages} from '../../store/products/selectors'

const containerClass = 't-my-product-details'
const titleClass = `${containerClass}__title`

const MyProductDetails = ({description, images, title}) => {
    return (
        <div className={containerClass}>
            <h1 className={titleClass}>{title}</h1>
            <div>{description}</div>
            {images.length > 0 ?
                <div>
                    <Carousel>
                        {images.map(({src, alt = ''}) => {
                            return (
                                <CarouselItem key={src}>
                                    <div>{src}</div>
                                    <Image alt={alt} src={src} />
                                </CarouselItem>
                            )
                        })}
                    </Carousel>
                </div>
            :
                <SkeletonBlock height="100px" />
            }
        </div>
    )
}

MyProductDetails.propTypes = {
    description: PropTypes.string,
    images: PropTypes.array,
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    title: getProductTitle,
    description: getProductDescription,
    images: getProductImages
})

export default template(connect(mapStateToProps, null)(MyProductDetails))
