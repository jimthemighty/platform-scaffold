import React from 'react'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import IconLabelButton from '../../../components/icon-label-button'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'


const CartEstimateShippingModal = (props) => {
    const {closeModal, isOpen} = props
    return (
        <Sheet className="t-cart__estimate-shipping" open={isOpen} onDismiss={closeModal} maskOpacity={0.7} effect="slide-right">
            <HeaderBar>
                <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                    <h1 className="u-h4 u-heading-family u-text-uppercase">
                        <span className="u-text-lighter">Estimate Shipping</span>
                    </h1>
                </HeaderBarTitle>

                <HeaderBarActions>
                    <IconLabelButton iconName="close" onClick={closeModal} />
                    <span className="u-visually-hidden">Close</span>
                </HeaderBarActions>
            </HeaderBar>

            <div className="u-padding-md">
                <FieldRow>
                    <Field label="Country">
                        <select>
                            <option>United States</option>
                        </select>
                    </Field>
                </FieldRow>

                <FieldRow>
                    <Field label="State/Province">
                        <select>
                            <option>Select</option>
                        </select>
                    </Field>
                </FieldRow>

                <FieldRow>
                    <Field label="Zip/Postal Code">
                        <input type="text" />
                    </Field>
                </FieldRow>

                <FieldRow>
                    <Button className="c--secondary u-width-full u-text-uppercase" type="submit">
                        Get Estimate
                    </Button>
                </FieldRow>
            </div>
        </Sheet>
    )
}

CartEstimateShippingModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: React.PropTypes.func,

    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,
}

export default CartEstimateShippingModal
