/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Components
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Breadcrumbs from 'mobify-amp-sdk/dist/components/breadcrumbs'

// Selectors
import {getCategoryTitle, getCategoryParentTitle, getCategoryParentHref} from '../../../../../web/app/store/categories/selectors'

// Utils
import {staticURL} from '../../../utils'

const ProductListHeader = ({title, parentName, parentHref}) => (
    <div className="u-flexbox u-align-bottom">
        <div className="u-flex u-padding-top-lg u-padding-bottom-lg u-padding-start-md">
            <div className="t-product-list__breadcrumb">
                <Breadcrumbs items={[{text: parentName, href: parentHref}]} />
            </div>
            <div className="u-margin-top-md">
                <h1 className="u-text-uppercase">{title}</h1>
            </div>
        </div>

        {title &&
            <AmpImage
                className="u-flex-none u-padding-end u-padding-bottom-sm"
                alt="Heading logo"
                height="60"
                width="60"
                src={staticURL(`/img/categories/${title.trim().replace(/\s+/g, '-')
                .toLowerCase()}@2x.png`)}
                layout="fixed"
            />
        }
    </div>
)

ProductListHeader.propTypes = {
    parentHref: PropTypes.string,
    parentName: PropTypes.string,
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    parentHref: getCategoryParentHref,
    parentName: getCategoryParentTitle,
    title: getCategoryTitle
})

export default connect(mapStateToProps)(ProductListHeader)
