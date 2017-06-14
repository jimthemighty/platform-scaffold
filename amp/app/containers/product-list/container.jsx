import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

// import components

// import partials
import ProductListHeader from './partials/product-list-header'

// import container styles
import containerStyles from './container.scss'

const ProductList = ({
    links,
    title
}) => (
    <div className="t-product-list">
        <ProductListHeader />

        <h1>{title}</h1>
        {links.map((linkText, i) => <p key={i}>{ linkText }</p>)}
    </div>
)

ProductList.propTypes = {
    /**
     * An array of links
     */
    links: PropTypes.array,
    /**
     * A title
     */
    title: PropTypes.string
}

ProductList.templateName = 'plp'

const mapStateToProps = (state) => ({
    links: state.links,
    title: `ProductList! - ${state.title}` || ''
})


export default connect(
    mapStateToProps
)(ProductList)

export const styles = containerStyles.toString()
