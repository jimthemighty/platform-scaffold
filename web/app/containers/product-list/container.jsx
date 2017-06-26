/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import template from '../../template'
import {isRunningInAstro} from '../../utils/astro-integration'
import ProductListHeader from './partials/product-list-header'
import SearchResultHeader from './partials/search-result-header'
import ProductListContents from './partials/product-list-contents'

const ProductList = (props) => {
    const {router, route: {routeName}, location: {query: {page, sort}, pathname}} = props
    return (
        <div className="t-product-list">
            {!isRunningInAstro &&
                <div>
                    {routeName === 'searchResultPage' ?
                        <SearchResultHeader />
                    :
                        <ProductListHeader />
                    }
                </div>
            }
            <ProductListContents
                routeName={routeName}
                path={pathname}
                page={page ? parseInt(page) : 1}
                selectedSortOption={sort ? sort : 'default'}
                router={router}
            />
        </div>
    )
}

ProductList.propTypes = {
    // Location object added by react router
    location: React.PropTypes.object,
    // Route object added by react router
    route: React.PropTypes.object,
    // React Router for pagination
    router: React.PropTypes.object,
}

export default template(ProductList)
