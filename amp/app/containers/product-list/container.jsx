import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import AmpLightbox from '../../components/amp-lightbox'
import containerStyles from './container.scss'
import {staticURL} from '../../utils'

import {createPropsSelector} from 'reselect-immutable-helpers'
import {getFilteredAndSortedListProducts} from '../../../../web/app/containers/product-list/selectors'
import {getCategoryItemCount} from '../../../../web/app/store/categories/selectors'
import {initProductListPage} from '../../../../web/app/integration-manager/categories/commands'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'

const containerClass = 't-product-list'

const ProductList = ({
    numItems,
    products
}) => (

    <div className={containerClass}>
        <div dangerouslySetInnerHTML={{__html: '<button on="tap:my-lightbox">Open lightbox</button>'}} />
        <AmpLightbox id="my-lightbox">
            <AmpImage src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" width="500" height="500" />
        </AmpLightbox>
        <AmpImage src={staticURL('mobify.png')} width="252" height="64" layout="fixed" />

        <h1>Number of items: {numItems}</h1>
        {
            products.map((prod) =>
                <div key={prod.id}>
                    <h2>{prod.title}</h2>
                    <AmpImage src={prod.thumbnail.src} width="240" height="300" layout="fixed" />
                    <p>{prod.price}</p>
                </div>
            )
        }
    </div>
)

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    numItems: PropTypes.number
}

ProductList.resolves = [({dispatch, getState}) => {
    return dispatch(initProductListPage(getState().ui.app.get(CURRENT_URL)))
}]

ProductList.templateName = 'plp'

const mapStateToProps = createPropsSelector({
    numItems: getCategoryItemCount,
    products: getFilteredAndSortedListProducts
})


export default connect(
    mapStateToProps
)(ProductList)

export const styles = containerStyles.toString()
