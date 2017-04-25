import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'

import Link from 'progressive-web-sdk/dist/components/link'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import {isRunningInAstro} from '../../../utils/astro-integration'

const SearchResultHeader = ({title}) => (
    <div className="u-flexbox u-align-bottom">
        <div className="u-flex u-padding-top-lg u-padding-bottom-lg u-padding-start-md">
            {!isRunningInAstro &&
                <div className="t-search-result__breadcrumb">
                    <Link href="/" className="u-text-small">Home</Link>
                </div>
            }
            <div className="u-margin-top-md">
                {title ?
                    <h1 className="u-text-uppercase">{title}</h1>
                :
                    <SkeletonText lines={1} type="h1" width="100px" />
                }
            </div>
        </div>
    </div>
)

SearchResultHeader.propTypes = {
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    title: selectors.getSearchResultTitle
})

export default connect(mapStateToProps)(SearchResultHeader)
