/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import * as ReduxForm from 'redux-form'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import InlineLoader from 'progressive-web-sdk/dist/components/inline-loader'

import {submitPromoCode} from '../actions'
import {isPromoSubmitting} from '../selectors'

const CartPromoForm = (props) => {
    const {handleSubmit, submitPromoCode, disabled, submitting, isPromoSubmitting} = props
    return (
        <form onSubmit={handleSubmit(submitPromoCode)} noValidate>
            <FieldRow>
                <ReduxForm.Field component={Field} name="promo">
                    {isPromoSubmitting ?
                        <input
                            disabled
                            className="t-cart__promo-input"
                            type="text"
                            placeholder="Enter promo or gift code"
                        />
                    :
                        <input
                            className="t-cart__promo-input"
                            type="text"
                            placeholder="Enter promo or gift code"
                            noValidate
                        />
                    }
                </ReduxForm.Field>
                {isPromoSubmitting ?
                    <Button className="c--tertiary u-margin-0">
                        <InlineLoader className="pw--small" title="Submitting" />
                    </Button>
                :
                    <Button type="submit"
                        className="c--tertiary u-margin-0 u-text-uppercase"
                        disabled={disabled || submitting}>
                        Apply
                    </Button>
                }
            </FieldRow>
        </form>
    )
}

CartPromoForm.propTypes = {
    /**
     * Whether the form is disabled or not
     */
    disabled: React.PropTypes.bool,

    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,

    isPromoSubmitting: React.PropTypes.bool,

    /**
     * Submits the promo code
     */
    submitPromoCode: React.PropTypes.func,

    /**
     * Redux-form internal
     */
    submitting: React.PropTypes.bool
}

// Just return an empty error object for now
const validate = () => ({})

const mapStateToProps = createPropsSelector({
    isPromoSubmitting
})

const mapDispatchToProps = {
    submitPromoCode
}

const CartPromoReduxForm = ReduxForm.reduxForm({
    form: 'cartPromoForm',
    validate,
})(CartPromoForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartPromoReduxForm)
