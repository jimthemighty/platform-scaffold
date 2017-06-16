import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import containerStyles from './container.scss'

import List from '../../components/list'
import ProductTile from '../../components/product-tile'

import {createPropsSelector} from 'reselect-immutable-helpers'
import {getFilteredAndSortedListProducts} from '../../../../web/app/containers/product-list/selectors'
import {getCategoryItemCount} from '../../../../web/app/store/categories/selectors'
import {initProductListPage} from '../../../../web/app/integration-manager/categories/commands'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'

// Partials
import ProductListHeader from './partials/product-list-header'
// import ProductListContents from './partials/product-list-contents'

const ProductList = ({
    numItems,
    products
}) => (

    <div className="t-product-list">
        <ProductListHeader />

        <div className="t-product-list__container u-padding-end u-padding-bottom-lg u-padding-start">
            <p className="t-product-list__num-results">{numItems} Results</p>
            <List>
                {
                    products.map((prod) =>
                        <ProductTile
                            href="/"
                            key={prod.id}
                            price={prod.price}
                            thumbnail={{
                                alt: prod.title,
                                src: prod.thumbnail.src
                            }}
                            title={prod.title}
                        />
                    )
                }
            </List>
        </div>
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
