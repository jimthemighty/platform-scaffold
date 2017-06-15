/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getCategoryItemCount} from '../../../store/categories/selectors'
import * as selectors from '../selectors'
import {staticURL} from '../../../utils'
import {changeSort} from '../actions'

import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Button from '../../../components/button'
import Field from '../../../components/field'

// import List from 'progressive-web-sdk/dist/components/list'

const noResultsText = 'We can\'t find products matching the selection'
const emptySearchText = 'Your search returned no results. Please check your spelling and try searching again.'

// const ResultList = ({products}) => (
//     <List className="c--borderless">
//         {products.map((product, idx) => <ProductTile key={product ? product.id : idx} {...product} />)}
//     </List>
// )
//
// ResultList.propTypes = {
//     products: PropTypes.array
// }

const NoResultsList = ({routeName}) => (
    <div className="u-flexbox u-direction-column u-align-center">
        <AmpImage
            className="u-flex-none"
            alt="Crystal Ball"
            width="122"
            height="110"
            layout="fixed"
            src={staticURL('static/img/global/no-results.png')}
        />

        <div className="t-product-list__no-results-text u-text-align-center">
            {routeName === 'searchResultPage' ? emptySearchText : noResultsText}
        </div>
    </div>
)

NoResultsList.propTypes = {
    routeName: PropTypes.string
}

const ProductListContents = ({
    activeFilters,
    products,
    sortChange,
    routeName
}) => (
    <div>

        <div className="t-product-list__container u-padding-end u-padding-bottom-lg u-padding-start">
            <div className="t-product-list__num-results u-padding-md u-padding-start-sm u-padding-end-sm">
                <div>
                    {products.length > 0 &&
                        <div className="u-flexbox">
                            <div className="t-product-list__filter u-flex u-margin-end-md">
                                <Field
                                    idForLabel="filterButton"
                                    label={`${products.length} Items`}
                                >
                                    <Button
                                        className="c--tertiary u-width-full u-text-uppercase"
                                        disabled={routeName === 'searchResultPage' || activeFilters.length > 0}
                                        id="filterButton"
                                    >
                                        Filter
                                    </Button>
                                </Field>
                            </div>

                            <div className="t-product-list__sort u-flex">
                                <Field
                                    className="pw--has-select"
                                    idForLabel="sort"
                                    label="Sort by"
                                >
                                    <select
                                        className="u-color-neutral-60"
                                        onChange={(e) => { sortChange(e.target.value) }}
                                        onBlur={(e) => { sortChange(e.target.value) }}
                                    >
                                        {/* This list of options corresponds to the functions in app/utils/sort-utils.js */}
                                        <option value="position">Position</option>
                                        <option value="name">Name</option>
                                        <option value="price">Price</option>
                                    </select>
                                </Field>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {(products.length > 0) ?
                {/* <ResultList products={products} /> */}
            :
                <NoResultsList routeName={routeName} />
            }
        </div>
    </div>
)


ProductListContents.propTypes = {
    products: PropTypes.array.isRequired,
    activeFilters: PropTypes.array,
    numItems: PropTypes.number,
    routeName: PropTypes.string,
    sortChange: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    numItems: getCategoryItemCount,
    activeFilters: selectors.getActiveFilters,
    products: selectors.getFilteredAndSortedListProducts
})

const mapDispatchToProps = {
    sortChange: changeSort,
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductListContents)
