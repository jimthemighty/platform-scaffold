import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../../../../../web/app/containers/product-list/selectors'
import {staticURL} from '../../../utils'
import {getCategoryItemCount} from '../../../../../web/app/store/categories/selectors'

import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Button from '../../../components/button'
import Field from '../../../components/field'
import List from '../../../components/list'
import ProductTile from '../../../components/product-tile'

const noResultsText = 'We can\'t find products matching the selection'
const emptySearchText = 'Your search returned no results. Please check your spelling and try searching again.'

const ResultList = ({products}) => (
    <List className="amp--borderless">
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
)

ResultList.propTypes = {
    products: PropTypes.array
}

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


const ProductListContents = (props) => {
    const {sheetId, products, routeName, activeFilters} = props

    const toggleFilterSheet = `tap:${sheetId}.toggle`

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
                                            className="amp--tertiary u-width-full u-text-uppercase"
                                            disabled={routeName === 'searchResultPage' || activeFilters.length > 0}
                                            id="filterButton"
                                            on={toggleFilterSheet}
                                        >
                                            Filter
                                        </Button>
                                    </Field>
                                </div>

                                <div className="t-product-list__sort u-flex">
                                    <Field
                                        className="amp--has-select"
                                        idForLabel="sort"
                                        label="Sort by"
                                    >
                                        <select
                                            className="u-color-neutral-60"
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
    numItems: PropTypes.number,
    routeName: PropTypes.string,
    sheetId: PropTypes.string
}


const mapStateToProps = createPropsSelector({
    activeFilters: selectors.getActiveFilters,
    numItems: getCategoryItemCount,
    products: selectors.getFilteredAndSortedListProducts
})


export default connect(mapStateToProps)(ProductListContents)
