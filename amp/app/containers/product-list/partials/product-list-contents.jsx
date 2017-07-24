/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {canonicalURL, staticURL} from '../../../utils'
import URL from 'url'

// Components
import Img from 'mobify-amp-sdk/dist/components/img'
import Button from 'mobify-amp-sdk/dist/components/button'
import Form from 'mobify-amp-sdk/dist/components/form'
import Field from 'mobify-amp-sdk/dist/components/field'
import List from 'mobify-amp-sdk/dist/components/list'
import ProductTile from '../../../components/product-tile'

// Selectors
import * as selectors from '../../../../../web/app/containers/product-list/selectors'
import {getCurrentUrl} from 'progressive-web-sdk/dist/store/app/selectors'
import {getCategoryItemCount} from '../../../../../web/app/store/categories/selectors'

const noResultsText = 'We can\'t find products matching the selection'
const emptySearchText = 'Your search returned no results. Please check your spelling and try searching again.'

const formAction = (currentUrl) => {
    const action = URL.parse(canonicalURL(currentUrl))
    action.query = null
    action.search = null
    action.fragment = null
    return URL.format(action)
}

const ResultList = ({products}) => (
    <List className="a--borderless">
        {
            products.map((prod) =>
                <ProductTile
                    href={prod.href}
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
)

ResultList.propTypes = {
    products: PropTypes.array
}

const NoResultsList = ({routeName}) => (
    <div className="u-flexbox u-direction-column u-align-center">
        <Img
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

const ProductListContents = (props) => {
    const {sheetId, products, routeName, activeFilters, currentUrl} = props

    const toggleFilterSheet = `tap:${sheetId}.toggle`
    const formId = `${sheetId}__form`

    return (
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
                                            className="a--tertiary u-width-full u-text-uppercase"
                                            disabled={routeName === 'searchResultPage' || activeFilters.length > 0}
                                            id="filterButton"
                                            on={toggleFilterSheet}
                                        >
                                            Filter
                                        </Button>
                                    </Field>
                                </div>

                                <div className="t-product-list__sort u-flex">
                                    <Form id={formId} method="GET" target="_top" action={formAction(currentUrl)}>
                                        <Field
                                            className="a--has-select"
                                            idForLabel="sort"
                                            label="Sort by"
                                        >
                                            <select
                                                name="product_list_order"
                                                className="u-color-neutral-60"
                                                on={`change:${formId}.submit`}
                                            >
                                                {/* This list of options corresponds to the functions in app/utils/sort-utils.js */}
                                                <option value="">Position</option>
                                                <option value="name">Name</option>
                                                <option value="price">Price</option>
                                            </select>
                                        </Field>
                                    </Form>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {(products.length > 0) ?
                    <ResultList products={products} />
                :
                    <NoResultsList routeName={routeName} />
                }
            </div>
        </div>
    )
}

ProductListContents.propTypes = {
    products: PropTypes.array.isRequired,
    activeFilters: PropTypes.array,
    currentUrl: PropTypes.string,
    numItems: PropTypes.number,
    routeName: PropTypes.string,
    sheetId: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    activeFilters: selectors.getActiveFilters,
    numItems: getCategoryItemCount,
    products: selectors.getSortedListProducts,
    currentUrl: getCurrentUrl
})

export default connect(mapStateToProps)(ProductListContents)
