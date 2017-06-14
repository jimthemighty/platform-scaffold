/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import {getTitle, getText} from './selectors'
import {getCategoryProducts, getCategoryDescription, getCategoryTitle} from '../../store/categories/selectors'
// import * as startersKitActions from './actions'

import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import ProductTile from '../../components/product-tile'
import List from 'progressive-web-sdk/dist/components/list'

const containerClass = 't-starters-kit'
const titleClass = `${containerClass}__title`

const StartersKit = ({description, products, title, text}) => (
    <div className={containerClass}>
        { title ?
            <h1 className={titleClass}>{title}</h1>
        :
            <SkeletonText lines={1} type="h1" width="100px" />
        }
        { description ?
            <Accordion>
                <AccordionItem header="Description">
                    {description}
                </AccordionItem>
            </Accordion>
        :
            <SkeletonBlock height="100px" />
        }
        <br />
        <div>
            { products && products.length > 0 ?
                <ResultList products={products} />
            :
                <SkeletonBlock height="50px" />
            }
        </div>
        {/*{text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}*/}
    </div>
)

StartersKit.propTypes = {
    description: PropTypes.string,
    products: PropTypes.array,
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product, idx) => (<ProductTile key={idx} {...product} />))}
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

const mapStateToProps = createPropsSelector({
    title: getCategoryTitle,
    description: getCategoryDescription,
    products: getCategoryProducts,
})

const mapDispatchToProps = {
    // setTitle: startersKitActions.setTitle
}

export default template(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(StartersKit)
)
