import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {reduxForm, Field as ReduxFormField} from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'

import {getFields, getHref} from '../selectors'
import {submitLoginForm} from '../actions'

const LoginForm = ({error, fields, handleSubmit, href, submitForm, submitting}) => {

    const onSubmit = (values) => {
        return new Promise((resolve, reject) => {
            submitForm(values, resolve, reject)
        })
    }

    // Left off here -- formValues not being received in Action
    return (
        <form noValidate={true} onSubmit={handleSubmit(onSubmit)}>
            <div>{error}</div>
            <FieldSet legend="Enter your credentials">
                {fields.map((field, idx) =>
                    <FieldRow key={idx}>
                        <ReduxFormField
                            name={field.name}
                            label={field.label}
                            component={(props) => (
                                <input type={field.type} />
                            )}
                        />
                    </FieldRow>
                )}
                <FieldRow>
                    <Button
                        className="c--primary u-width-full"
                        type="submit"
                        disabled={submitting || !href}
                    >
                        Login
                    </Button>
                </FieldRow>
            </FieldSet>
        </form>
    )
}

// Redux-form props list: http://redux-form.com/6.0.0-alpha.4/docs/api/Props.md/
LoginForm.propTypes = {
    error: PropTypes.string, // redux-form supplied
    fields: PropTypes.array,
    handleSubmit: PropTypes.func, // redux-form supplied
    href: PropTypes.string,
    submitForm: PropTypes.func,
    submitting: PropTypes.bool, // redux-form supplied
}

const mapStateToProps = createPropsSelector({
    fields: getFields,
    href: getHref,
})

const mapDispatchToProps = {
    submitForm: submitLoginForm
}

const ReduxLoginForm = reduxForm({
    form: 'login-form'
})(LoginForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReduxLoginForm)
