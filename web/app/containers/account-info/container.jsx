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
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

import {submitAccountInfoForm} from './actions'

import {getAccountInfoInitialValues} from './selectors'
// import * as accountInfoActions from './actions'

const AccountInfoForm = ({handleSubmit, onSubmit, error}) => {
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
                            error={error && error.names}
                        >
                            <input
                                className="t-account-info-input"
                                type="text"
                                data-analytics-name={UI_NAME.customerName}
                            />
                        </ReduxForm.Field>
                    </FieldRow>
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            label="Email"
                            name="email"
                            error={error && error.email}
                        >
                            <input
                                className="t-account-info-input"
                                type="text"
                                data-analytics-name={UI_NAME.email}
                            />
                        </ReduxForm.Field>
                    </FieldRow>
                </div>
                <div className="t-account-info__section u-bg-color-neutral-10 u-padding-top-lg u-padding-bottom-md u-padding-start-md u-padding-end-md u-border-top u-border-bottom">
                    <h2 className="u-h5 u-text-family">Change password (optional)</h2>
                </div>
                <div className="t-account-info__section-content u-padding-md">
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            label="Current Password"
                            name="currentPassword"
                            error={error && error.currentPassword}
                        >
                            <PasswordInput isText buttonTextHide="hide" buttonTextShow="show" analyticsName={UI_NAME.currentPassword} />
                        </ReduxForm.Field>
                    </FieldRow>
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            label="New Password"
                            name="newPassword"
                            error={error && error.newPassword}
                        >
                            <PasswordInput isText buttonTextHide="hide" buttonTextShow="show" analyticsName={UI_NAME.password} />
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
    error: PropTypes.object,
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
