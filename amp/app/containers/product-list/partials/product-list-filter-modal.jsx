import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../../../../../web/app/containers/product-list/selectors'


import Button from '../../../components/button'
import Sheet from '../../../components/sheet'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from '../../../components/header-bar'
import IconLabelButton from '../../../components/icon-label-button'

const ProductListFilterModal = (props) => {

    const {sheetId} = props

    const toggleFilterSheet = `tap:${sheetId}.toggle`

    return (
        <Sheet
            id={sheetId}
            className="t-product-list__filter-modal"
            side="right"
        >
            <HeaderBar>
                <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                    <h1 className="u-h3 u-text-uppercase">
                        <span className="u-text-weight-extra-light">Filter Results By</span>
                    </h1>
                </HeaderBarTitle>

                <HeaderBarActions>
                    <IconLabelButton iconName="close" label="close" on={toggleFilterSheet}>Close</IconLabelButton>
                </HeaderBarActions>
            </HeaderBar>


        </Sheet>
    )
}

ProductListFilterModal.propTypes = {
    /*
     * An array of filters
     */
    filters: PropTypes.array,
    sheetId: PropTypes.string,
}

const mapStateToProps = createPropsSelector({
    filters: selectors.getFilters
})

export default connect(
    mapStateToProps
)(ProductListFilterModal)
