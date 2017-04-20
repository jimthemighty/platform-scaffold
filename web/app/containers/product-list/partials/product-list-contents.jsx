import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {PRODUCT_LIST_FILTER_MODAL} from '../constants'
import {openModal} from '../../../store/modals/actions'

import Button from 'progressive-web-sdk/dist/components/button'
import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import ProductTile from './product-tile'

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product, idx) =>
            <ProductTile key={idx} {...product} />)
        }
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

const NoResultsList = ({bodyText}) => (
    <div className="u-flexbox u-direction-column u-align-center">
        <Image
            className="u-flex-none"
            alt="Crystal Ball"
            width="122px"
            height="110px"
            src={getAssetUrl('static/img/global/no-results.png')}
        />

        <div className="t-product-list__no-results-text u-text-align-center">
            {bodyText}
        </div>
    </div>
)

NoResultsList.propTypes = {
    bodyText: PropTypes.string
}

const ProductListContents = ({
    contentsLoaded,
    hasProducts,
    noResultsText,
    products,
    openModal
}) => (
    <div className="t-product-list__container u-padding-end u-padding-bottom-lg u-padding-start">
        <div className="t-product-list__num-results u-padding-md">
            {contentsLoaded ?
                <div className="u-flexbox">
                    <div className="t-product-list__filter u-flex">
                        <div className="u-text-semi-bold">{products.length} Results</div>

                        <Button
                            className="c--tertiary u-width-full u-text-uppercase"
                            onClick={openModal}
                        >
                            Filters
                        </Button>
                    </div>
                </div>
            :
                <SkeletonBlock height="20px" />
            }
        </div>

        {(hasProducts || !contentsLoaded) ?
            <ResultList products={products} />
        :
            <NoResultsList bodyText={noResultsText} />
        }
    </div>
)

ProductListContents.propTypes = {
    products: PropTypes.array.isRequired,
    contentsLoaded: PropTypes.bool,
    hasProducts: PropTypes.bool,
    noResultsText: PropTypes.string,
    numItems: PropTypes.string,
    openModal: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    hasProducts: selectors.getHasProducts,
    contentsLoaded: selectors.getProductListContentsLoaded,
    noResultsText: selectors.getNoResultsText,
    numItems: selectors.getNumItems,
    products: selectors.getFilteredProductListProducts
})

const mapDispatchToProps = {
    openModal: () => openModal(PRODUCT_LIST_FILTER_MODAL)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductListContents)
