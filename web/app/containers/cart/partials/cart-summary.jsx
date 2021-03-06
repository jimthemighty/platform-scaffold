/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as cartSelectors from 'progressive-web-sdk/dist/store/cart/selectors'
import {CART_ESTIMATE_SHIPPING_MODAL} from '../../../modals/constants'
import {openModal} from '../../../modals/actions'
import {getSelectedShippingLabel, getPostcode} from '../../../store/checkout/shipping/selectors'
import {getCheckoutShippingURL} from '../../app/selectors'
import {removePromoCode} from '../actions'
import {formatPrice, parsePrice} from '../../../utils/money-utils'

import Button from 'progressive-web-sdk/dist/components/button'
import CartPromoForm from './cart-promo-form'
import Icon from 'progressive-web-sdk/dist/components/icon'
import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

// This is not written as a component to preserve the proptype
// requirements of the Ledger component.
const renderTaxAmountRow = (taxAmount, zipCode, openCalculateModal) => {
    const editButton = (
        <span>Based on delivery to
            <Button
                innerClassName="u-padding-start-sm u-color-brand u-text-letter-spacing-normal"
                onClick={openCalculateModal}
                data-analytics-name={UI_NAME.recalculateTax}
            >
                {zipCode}
            </Button>
        </span>
    )

    return (
        <LedgerRow
            className="u-flex-none u-border-0"
            label="Taxes"
            value={taxAmount}
            labelAction={editButton}
            key="Taxes"
        />
    )
}

const CartSummary = ({
    checkoutShippingURL,
    summaryCount,
    orderTotal,
    subtotal,
    selectedShippingRate,
    selectedShippingLabel,
    zipCode,
    taxAmount,
    discounts,
    onCalculateClick,
    removePromoCode
}) => {
    const calculateButton = (
        <Button
            innerClassName="u-padding-end-0 u-color-brand u-text-letter-spacing-normal"
            onClick={onCalculateClick}
            data-analytics-name={UI_NAME.calculateTax}
        >
            Calculate <Icon name="chevron-right" />
        </Button>
    )

    const RemoveDiscountButton = ({id}) => ( // eslint-disable-line react/prop-types
        <Button
            innerClassName="u-color-brand u-padding-start u-text-letter-spacing-normal"
            onClick={() => removePromoCode(id)}
            data-analytics-name={UI_NAME.removePromotionCode}
        >
            Remove
        </Button>
    )

    const renderDiscountTotal = () => {
        const totalDiscount = discounts.reduce((total, discount) => {
            const current = parsePrice(discount.amount)
            return total + current
        }, 0)

        return (<LedgerRow
            key="-1"
            className="t-cart__summary-discounts"
            label={`Discounts`}
            value={formatPrice(totalDiscount)}
        />)
    }

    const renderDiscount = ({amount, couponCode, text, id}, index) => ( // eslint-disable-line react/prop-types
        <LedgerRow
            key={index}
            className="t-cart__summary-discounts"
            label={`Discount: ${couponCode}`}
            labelAction={<RemoveDiscountButton id={id} />}
            labelDescription={text}
            value={amount}
        />
    )

    const renderDiscounts = () => {
        return [renderDiscountTotal(), discounts.map(renderDiscount)]
    }

    return (
        <div className="t-cart__summary">
            <Accordion className="u-margin-top u-bg-color-neutral-00">
                <AccordionItem header="Promo code">
                    <CartPromoForm />
                </AccordionItem>
            </Accordion>
            <div className="t-cart__summary-title u-padding-top-lg u-padding-bottom-md">
                <h2 className="u-h4 u-text-uppercase">
                    Order Summary
                </h2>
            </div>

            <div className="u-bg-color-neutral-00 u-border-light-top u-border-light-bottom">
                <Ledger className="u-border-light-top">
                    <LedgerRow
                        label={`Subtotal (${summaryCount} items)`}
                        value={subtotal}
                    />

                    {(zipCode !== null && zipCode !== undefined) &&
                        <LedgerRow
                            label={`Shipping (${selectedShippingLabel})`}
                            value={selectedShippingRate}
                            key={`Shipping (${selectedShippingLabel})`}
                        />
                    }

                    {discounts && !!discounts.length && renderDiscounts()}

                    {(taxAmount && zipCode)
                        ? renderTaxAmountRow(taxAmount, zipCode, onCalculateClick)
                        : <LedgerRow
                            className="u-flex-none"
                            label="Taxes"
                            labelAction="Rates based on shipping location"
                            valueAction={calculateButton}
                            key="taxWithCalculate"
                        />
                    }
                </Ledger>
                <Ledger>
                    <LedgerRow
                        label="Total"
                        isTotal={true}
                        value={orderTotal}
                    />
                </Ledger>

                <div className="u-padding-end-md u-padding-bottom-lg u-padding-start-md">
                    <Button
                        className="pw--primary u-flex-none u-width-full u-text-uppercase qa-cart__checkout"
                        href={checkoutShippingURL}
                        data-analytics-name={UI_NAME.checkout}>
                        <Icon name="lock" />
                        Proceed To Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}

CartSummary.propTypes = {
    checkoutShippingURL: PropTypes.string,
    discounts: PropTypes.array,
    orderTotal: PropTypes.string,
    removePromoCode: PropTypes.func,
    selectedShippingLabel: PropTypes.string,
    selectedShippingRate: PropTypes.string,
    subtotal: PropTypes.string,
    summaryCount: PropTypes.number,
    taxAmount: PropTypes.string,
    zipCode: PropTypes.string,
    onCalculateClick: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    discounts: cartSelectors.getDiscounts,
    checkoutShippingURL: getCheckoutShippingURL,
    subtotal: cartSelectors.getSubtotal,
    orderTotal: cartSelectors.getOrderTotal,
    selectedShippingRate: cartSelectors.getShippingAmount,
    selectedShippingLabel: getSelectedShippingLabel,
    zipCode: getPostcode,
    taxAmount: cartSelectors.getTax,
    summaryCount: cartSelectors.getCartSummaryCount,
})

const mapDispatchToProps = {
    onCalculateClick: () => openModal(CART_ESTIMATE_SHIPPING_MODAL, UI_NAME.estimateShipping),
    removePromoCode
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary)
