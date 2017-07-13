/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import ProductImage from '../product-image'
import ProductItem from '../product-item'

/**
 * INSERT_DESCRIPTION_HERE
 */

const ProductSkeleton = ({productItemClassNames}) => (
    <ProductItem
        className={productItemClassNames}
        title={<SkeletonText type="h3" className="u-margin-bottom-sm" />}
        image={<ProductImage src="null" alt="null" />}
    >
        <SkeletonText width="60%" style={{lineHeight: '20px'}} />
        <SkeletonText width="60%" style={{lineHeight: '20px'}} className="u-margin-bottom-sm" />
        <div className="t-cart__product-content-placeholder" />
    </ProductItem>
)

ProductSkeleton.propTypes = {
    productItemClassNames: PropTypes.string
}

export default ProductSkeleton
