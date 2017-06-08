import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import AmpLightbox from '../../components/amp-lightbox'
import containerStyles from './container.scss'

import {createPropsSelector} from 'reselect-immutable-helpers'
import {getFilteredAndSortedListProducts} from '../../../../web/app/containers/product-list/selectors'
import {getCategoryItemCount} from '../../../../web/app/store/categories/selectors'

const containerClass = 't-product-list'

const ProductList = ({
    numItems,
    /* products*/
}) => (
    <div className={containerClass}>
        <div dangerouslySetInnerHTML={{__html: '<button on="tap:my-lightbox">Open lightbox</button>'}} />
        <AmpLightbox id="my-lightbox">
            <AmpImage src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" width="500" height="500" />
        </AmpLightbox>
        <AmpImage src="/static/mobify.png" width="252" height="64" layout="fixed" />

        <h1>Number of items: {numItems}</h1>
    </div>
)

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    numItems: PropTypes.number
}

ProductList.templateName = 'plp'

const mapStateToProps = createPropsSelector({
    numItems: getCategoryItemCount,
    products: getFilteredAndSortedListProducts
})


export default connect(
    mapStateToProps
)(ProductList)

export const styles = containerStyles.toString()
