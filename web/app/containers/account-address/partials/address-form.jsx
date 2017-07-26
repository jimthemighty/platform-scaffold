/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as ReduxForm from 'redux-form'
import {ADDRESS_FORM_NAME} from '../../../store/form/constants'
import Button from 'progressive-web-sdk/dist/components/button'
import {getIsEditing} from '../selectors'
import {submitAddAddress, submitEditAddress} from '../actions'

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

export const AccountAddressForm = ({handleSubmit, submitAddAddress, closeAddressModal, isEditing, submitEditAddress}) => {
    return (
        <form onSubmit={handleSubmit(isEditing ? submitEditAddress : submitAddAddress)} noValidate>
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
                    onClick={closeAddressModal}
                />
            </div>
        </form>
    )
}

AccountAddressForm.propTypes = {
    closeAddressModal: React.PropTypes.func,
    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,
    /**
     * State of whether modal is edit or adding address
     */
    isEditing: React.PropTypes.bool,
    /**
    * Submits the address form information to the server for adding
    */
    submitAddAddress: React.PropTypes.func,
    /**
    * Submits the address form information to the server for editing
    */
    submitEditAddress: React.PropTypes.func
}

const mapStateToProps = createPropsSelector({
    isEditing: getIsEditing
})

const mapDispatchToProps = {
    submitAddAddress,
    submitEditAddress
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
