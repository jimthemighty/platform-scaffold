import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import AmpLightbox from '../../components/amp-lightbox'
import List from '../../components/list'
import ProductTile from '../../components/product-tile'

import containerStyles from './container.scss'

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
        <AmpImage src="/static/mobify.png" width="252" height="64" layout="fixed" />
        <div className="t-product-list__container">
            <p className="t-product-list__num-results">Number of items: {numItems}</p>
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
