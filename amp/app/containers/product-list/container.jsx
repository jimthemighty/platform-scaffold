import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getFilteredAndSortedListProducts} from '../../../../web/app/containers/product-list/selectors'
import {getCategoryItemCount} from '../../../../web/app/store/categories/selectors'
import {initProductListPage} from '../../../../web/app/integration-manager/categories/commands'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'

// Partials
import ProductListHeader from './partials/product-list-header'

// Components
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'

// Container styles
import containerStyles from './container.scss'

const ProductList = ({
    numItems,
    products
}) => (
    <div className="t-product-list">
        <ProductListHeader />

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
    /**
     * An array of links
     */
    links: PropTypes.array,
    numItems: PropTypes.number,
    /**
     * A title
     */
    title: PropTypes.string
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
