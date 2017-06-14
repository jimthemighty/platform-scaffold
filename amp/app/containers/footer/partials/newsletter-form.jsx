import React from 'react'
import Button from '../../../components/button'
import AmpForm from '../../../components/amp-form'
import Field from '../../../components/field'
import FieldRow from '../../..//components/field-row'

const NewsletterForm = ({disabled, submitting}) => {
    return (
        <AmpForm method="POST" action-xhr="https://www.merlinspotions.com/newsletter/subscriber/new/" target="_top">
            <FieldRow>
                <Field>
                    <input
                        type="email"
                        placeholder="Enter your email..."
                        name="email"
                    />
                </Field>

                <Button
                    type="submit"
                    className="amp--tertiary u-margin-0 u-text-uppercase"
                    disabled={submitting || disabled}>
                    Submit
                </Button>
            </FieldRow>
        </AmpForm>
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
