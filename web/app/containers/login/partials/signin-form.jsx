import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import {submitSignInForm} from '../actions'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

import {LoginField, RememberMeTooltip} from './common'

const FORGOT_PASSWORD_PATH = '/customer/account/forgotpassword'

class SignInForm extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        return this.props.submitForm(values)
    }

    render() {
        const {
            error,
            submitting,
            handleSubmit,
            isFormLoaded
        } = this.props

        return (
            <form noValidate={true} onSubmit={handleSubmit(this.onSubmit)}>
                {error &&
                    <div className="u-margin-bottom-md u-color-error">
                        {error}
                    </div>
                }

                <FieldSet className="t-login__signin-fieldset">
                    <LoginField
                        label="Email"
                        name="login[username]"
                        type="email"
                        required={true}
                        />

                    <LoginField
                        label="Password"
                        name="login[password]"
                        type="password"
                        required={true}
                        forgotPassword={{href: FORGOT_PASSWORD_PATH}}
                        />

                    <LoginField
                        label="Remember Me"
                        name="persistent_remember_me"
                        type="checkbox"
                        required={false}
                        tooltip={<RememberMeTooltip />}
                        />

                    <FieldRow>
                        <Button
                            className="c--primary u-width-full"
                            type="submit"
                            disabled={submitting || !isFormLoaded}
                        >
                            <span className="u-text-uppercase">Login</span>
                        </Button>
                    </FieldRow>
                </FieldSet>
            </form>
        )
    }
}

SignInForm.propTypes = {
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    isFormLoaded: PropTypes.bool,
    submitForm: PropTypes.func,
    submitting: PropTypes.bool,
}


const ReduxSignInForm = reduxForm({
    form: 'signin-form'
})(SignInForm)

const mapStateToProps = createPropsSelector({
    isFormLoaded: selectors.signin.getIsFormLoaded
})

const mapDispatchToProps = {
    submitForm: submitSignInForm
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSignInForm)
