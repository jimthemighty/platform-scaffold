import React, {PropTypes} from 'react'
import {staticURL} from '../../utils'

import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import Breadcrumbs from '../../../components/breadcrumbs'

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
                height="60px"
                width="60px"
                src={staticURL(`/static/img/categories/${title.trim().replace(/\s+/g, '-')
                .toLowerCase()}@2x.png`)}
            />
        }
    </div>
)

ProductListHeader.defaultProps = {
    title: 'potions',
    parentName: 'Home',
    parentHref: '#'
}

ProductListHeader.propTypes = {
    contentsLoaded: PropTypes.bool,
    parentHref: PropTypes.string,
    parentName: PropTypes.string,
    title: PropTypes.string
}

export default ProductListHeader
