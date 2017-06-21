import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Components
import Button from '../../../components/button'
import Sheet from '../../../components/sheet'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from '../../../components/header-bar'
import IconLabelButton from '../../../components/icon-label-button'
import {Accordion, AccordionItem} from '../../../components/accordion'

// Selectors
import * as selectors from '../../../../../web/app/containers/product-list/selectors'

const ProductListFilterModal = (props) => {

    const {sheetId, filters} = props

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

            <Accordion initialOpenItems={[0]}>
                {filters.map(({label, ruleset, kinds}) =>
                    <AccordionItem header={label} key={ruleset} className="u-padding-0">
                        {/* disabling a11y lints because the below handler is
                            for the bubbled events from the children button elements */}
                        <div
                            className="t-product-list__filter-modal-items"
                            role="presentation"
                        >
                            {kinds.map(({count, label, query, href}) =>
                                <Button
                                    key={query}
                                    className="c--link u-width-full u-text-letter-spacing-normal"
                                    innerClassName="u-justify-start"
                                    id={query}
                                    href={href}
                                >
                                    <div>
                                        <span className="u-color-brand">{label}</span> <span className="u-color-neutral-40">({count})</span>
                                    </div>
                                </Button>
                            )}
                        </div>
                    </AccordionItem>
                )}
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
