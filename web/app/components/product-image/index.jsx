/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import Image from 'progressive-web-sdk/dist/components/image'

const ProductImage = ({src, alt}) => (
    <Image src={src} alt={alt} width="104px" height="104px" />
)

ProductImage.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string
}

export default ProductImage
