import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {canonicalURL} from '../../../utils'
import URL from 'url'

// Components
import Button from '../../../components/button'

// Selectors
import * as appSelectors from '../../../../../web/app/containers/app/selectors.js'

const ProductDetailsAddToCart = ({currentUrl}) => {

    return (
        <div className="u-padding-start-md u-padding-end-md">
            <Button
                href={canonicalURL(currentUrl)}
                className="amp--primary u-width-full u-text-uppercase u-margin-bottom-lg t-product-details__add-to-cart"
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
    currentUrl: appSelectors.getCurrentUrl
})

export default connect(mapStateToProps)(ProductDetailsAddToCart)
