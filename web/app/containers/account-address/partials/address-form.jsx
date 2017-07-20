/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as ReduxForm from 'redux-form'
import {ADDRESS_FORM_NAME} from '../../../store/form/constants'
import Button from 'progressive-web-sdk/dist/components/button'

import AccountAddressFields from './account-address-fields'

const REQUIRED_TEXT = 'Required'

const validate = (values, props) => {
    const errors = {}
    const requiredFieldNames = [
        'name',
        'addressLine1',
        'city',
        'countryId',
        'regionId',
        'postcode',
        'telephone'
    ]

    requiredFieldNames.forEach((fieldName) => {
        if (!values[fieldName]) {
            errors[fieldName] = REQUIRED_TEXT
        }
    })

    return errors
}

class AccountAddressForm extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        return new Promise((resolve, reject) => {
            const errors = validate(values, this.props)
            if (!Object.keys(errors).length) {
                return this.props.submitAddress()
            }
            return reject(new ReduxForm.SubmissionError(errors))
        })
    }

    render() {
        const {
            handleSubmit,
        } = this.props

        return (
            <form onSubmit={handleSubmit(this.onSubmit)} noValidate>
                <AccountAddressFields />
                <div className="u-padding-md">
                    <Button
                        className="pw--primary u-width-full u-margin-bottom-md"
                        type="submit"
                        text="Save"
                    />
                    <Button
                        className="pw--tertiary u-width-full"
                        type="button"
                        text="Cancel"
                    />
                </div>
            </form>
        )
    }
}

AccountAddressForm.propTypes = {
    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,
    /**
    * Submits the address form information to the server
    */
    submitAddress: React.PropTypes.func
}

const mapStateToProps = createPropsSelector({
    // initialValues: getInitialAddressValues,
})

const mapDispatchToProps = {
}


const AccountAddressReduxForm = ReduxForm.reduxForm({
    form: ADDRESS_FORM_NAME,
    validate,
    // keepDirtyOnReinitialize: true,
    // enableReinitialize: true
})(AccountAddressForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountAddressReduxForm)
