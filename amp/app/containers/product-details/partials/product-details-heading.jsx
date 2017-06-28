import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Components
import Breadcrumbs from '../../../components/breadcrumbs'

// Selectors
import * as selectors from '../../../../../web/app/containers/product-details/selectors'
import {getProductTitle, getProductPrice, getProductAvailability} from 'progressive-web-sdk/dist/store/products/selectors'

const ProductDetailsHeading = ({available, breadcrumbs, title, price}) => (
    <div className="t-product-details-heading u-padding-md u-box-shadow u-position-relative u-z-index-1">
        <div className="t-product-details__breadcrumbs u-margin-bottom-md">
            <Breadcrumbs items={breadcrumbs} />
        </div>

        <h1 className="t-product-details-heading__title u-text-uppercase u-margin-bottom">{title}</h1>
        {(available !== null && available !== undefined && price !== null && price !== undefined) &&
            <span className="t-product-details-heading__price t-product-details__price u-color-accent u-text-weight-regular u-text-family-header u-text-letter-spacing-small">{price}</span>
        }
    </div>
)

ProductDetailsHeading.propTypes = {
    available: PropTypes.bool,
    breadcrumbs: PropTypes.array,
    price: PropTypes.string,
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    available: getProductAvailability,
    breadcrumbs: selectors.getProductDetailsBreadcrumbs,
    title: getProductTitle,
    price: getProductPrice
})

export default connect(mapStateToProps)(ProductDetailsHeading)
