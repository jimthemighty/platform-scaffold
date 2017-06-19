import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import containerStyles from './container.scss'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getFilteredAndSortedListProducts} from '../../../../web/app/containers/product-list/selectors'
import {getCategoryItemCount} from '../../../../web/app/store/categories/selectors'
import {initProductListPage} from '../../../../web/app/integration-manager/categories/commands'
import {CURRENT_URL} from '../../../../web/app/containers/app/constants'

// Partials
import ProductListHeader from './partials/product-list-header'
import ProductListContents from './partials/product-list-contents'

const ProductList = () => {
    const filterSheetId = 'filter-sheet'

    return (
        <div className="t-product-list">
            <ProductListHeader />

            <ProductListContents sheetId={filterSheetId} /> {/* TODO FIX HOW TO WORK WITH route name eg. <ProductListContents routeName={routeName} /> */}
        </div>
    )
}

ProductList.propTypes = {
    // Route object added by react router
    route: PropTypes.object
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
