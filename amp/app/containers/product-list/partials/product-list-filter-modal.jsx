import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Components
import Sheet from '../../../components/sheet'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from '../../../components/header-bar'
import IconLabelButton from '../../../components/icon-label-button'
import {Accordion, AccordionItem} from '../../../components/accordion'

// Selectors
import * as selectors from '../../../../../web/app/containers/product-list/selectors'

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

            <Accordion initialOpenItems={[1]}>
                <AccordionItem header="Accordion Item #1">
                    <div>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </div>
                </AccordionItem>
                <AccordionItem header="Accordion Item #2">
                    <div className="u-margin-bottom-lg">Lorem Ipsum dolor sit amet</div>
                </AccordionItem>
                <AccordionItem header="Accordion Item #3">
                    <div className="u-margin-bottom-lg">Lorem Ipsum dolor sit amet</div>
                </AccordionItem>
            </Accordion>
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
