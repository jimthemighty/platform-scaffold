import React, {PropTypes} from 'react'
import Button from '../../../components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from '../../..//components/field-row'

const NewsletterForm = ({disabled, submitting}) => {
    return (
        <form noValidate>
            <FieldRow>
                <Field name="email">
                    <input
                        type="email"
                        placeholder="Enter your email..."
                    />
                </Field>

                <Button
                    type="submit"
                    className="c--tertiary u-margin-0 u-text-uppercase"
                    disabled={submitting || disabled}>
                    Submit
                </Button>
            </FieldRow>
        </form>
    )
}

NewsletterForm.propTypes = {
    /**
     * Whether the form is disabled or not
     */
    disabled: React.PropTypes.bool,
    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,
    /**
     * Redux-form internal
     */
    submitting: React.PropTypes.bool
}

export default NewsletterForm
