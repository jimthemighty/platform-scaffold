/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import PasswordInput from 'progressive-web-sdk/dist/components/password-input'
import Button from 'progressive-web-sdk/dist/components/button'
import {submitAccountInfoForm} from './actions'

import {getAccountInfoInitialValues} from './selectors'
// import * as accountInfoActions from './actions'

const AccountInfoForm = ({handleSubmit, onSubmit}) => {
    return (
        <div className="t-account-info">
            <div className="t-account-info__headings u-padding-top-lg u-padding-bottom-lg u-padding-start-md u-padding-end-md">
                <div className="t-account-info__breadcrumb">
                    <Breadcrumbs items={[{text: 'Back to Dashboard', href: '/customer/account'}]} />
                </div>
                <div className="u-margin-top-md">
                    <h1 className="t-account-info__title u-text-uppercase u-width-1of2">Edit Account</h1>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="t-account-info__section u-bg-color-neutral-10 u-padding-top-lg u-padding-bottom-md u-padding-start-md u-padding-end-md u-border-top u-border-bottom">
                    <h2 className="u-h5 u-text-family">Change name / email</h2>
                </div>
                <div className="t-account-info__section-content u-padding-md">
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            label="First & Last Name"
                            name="names"
                        >
                            <input
                                className="t-account-info-input"
                                type="text"
                            />
                        </ReduxForm.Field>
                    </FieldRow>
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            label="Email"
                            name="email"
                        >
                            <input
                                className="t-account-info-input"
                                type="text"
                            />
                        </ReduxForm.Field>
                    </FieldRow>
                </div>
                <div className="t-account-info__section u-bg-color-neutral-10 u-padding-top-lg u-padding-bottom-md u-padding-start-md u-padding-end-md u-border-top u-border-bottom">
                    <h2 className="u-h5 u-text-family">Change password (Optional)</h2>
                </div>
                <div className="t-account-info__section-content u-padding-md">
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            label="Current Password"
                            name="currentPassword"
                        >
                            <PasswordInput isText buttonTextHide="hide" buttonTextShow="show" />
                        </ReduxForm.Field>
                    </FieldRow>
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            label="New Password"
                            name="newPassword"
                        >
                            <PasswordInput isText buttonTextHide="hide" buttonTextShow="show" />
                        </ReduxForm.Field>
                    </FieldRow>
                    <FieldRow>
                        <Button
                            type="submit"
                            className="pw--primary u-width-full"
                        >
                        Save
                        </Button>
                    </FieldRow>
                </div>
            </form>
        </div>
    )
}

AccountInfoForm.propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    initialValues: getAccountInfoInitialValues
})

const mapDispatchToProps = {
    onSubmit: submitAccountInfoForm
}

const AccountInfo = ReduxForm.reduxForm({
    form: 'accountInfo'
})(AccountInfoForm)

export default template(connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountInfo))
