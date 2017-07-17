import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {canonicalURL} from '../../../utils'

// Components
import Button from 'mobify-amp-sdk/dist/components/button'

// Selectors
import {getCurrentUrl} from 'progressive-web-sdk/dist/store/app/selectors'

const ProductDetailsAddToCart = ({currentUrl}) => {

    return (
        <div className="u-padding-start-md u-padding-end-md">
            <Button
                href={canonicalURL(currentUrl)}
                className="a--primary u-width-full u-text-uppercase u-margin-bottom-lg t-product-details__add-to-cart"
            >
                Select Options & Buy
            </Button>
        </div>
    )
}

ProductDetailsAddToCart.propTypes = {
    currentUrl: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    currentUrl: getCurrentUrl
})

export default connect(mapStateToProps)(ProductDetailsAddToCart)
