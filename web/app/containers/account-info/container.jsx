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


import {getTitle, getFormInfo} from './selectors'
// import * as accountInfoActions from './actions'

const AccountInfoForm = ({title, initialValues}) => {
    const initValues = {
        names: 'blah blah'
    }
    return (
        <div className="t-account-info">
            <div className="t-account-info__headings u-padding-top-lg u-padding-bottom-lg u-padding-start-md u-padding-end-md">
                <div className="t-account-info__breadcrumb">
                    <Breadcrumbs items={[{text: 'Account Dashboard', href: '/customer/account'}]} />
                </div>
                <div className="u-margin-top-md">
                    <h1 className="t-account-info__title u-text-uppercase u-width-1of2">{title}</h1>
                </div>
            </div>
            <form>
                <div className="t-account-info__section">
                    Account Information
                </div>
                <div className="t-account-info__section-content u-padding-md">
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            label="First & Last Name"
                            name="names"
                            initialValues={initValues}
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
                            name="names"
                            initialValues={initValues}
                        >
                            <input
                                className="t-account-info-input"
                                type="text"
                            />
                        </ReduxForm.Field>
                    </FieldRow>
                </div>
                <div className="t-account-info__section">
                    Change Password (Optional)
                </div>
                <div className="t-account-info__section-content u-padding-md">
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            label="Current Password"
                            name="names"
                            initialValues={initValues}
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
                            label="New Password"
                            name="names"
                            initialValues={initValues}
                        >
                            <PasswordInput isText buttonTextHide="hide" buttonTextShow="show" />
                        </ReduxForm.Field>
                    </FieldRow>
                    <FieldRow>
                        <Button
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
    initialValues: PropTypes.object,
    title: PropTypes.string,
}

const mapStateToProps = createPropsSelector({
    title: getTitle,
    initialValues: getFormInfo
})

const mapDispatchToProps = {
    // setTitle: accountInfoActions.setTitle
}

const AccountInfo = ReduxForm.reduxForm({
    form: 'accountInfo'
})(AccountInfoForm)

export default template(connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountInfo))
