import React, {PropTypes} from 'react'
import classNames from 'classnames'


const getUniqueId = (() => {
    let i = 0

    return () => {
        return `field-${i++}`
    }
})()

/**
 * `Field` is a wrapper around a single form input that standardizes layout
 * of labels, hints and errors when using `redux-form`.
 *
 * It expects to receive an `<input>`, `<select>`, `<textarea>` or a custom
 * form-input component. Custom inputs should be compatible with redux-form
 * which typically means accepting `onChange`, `onBlur` and `value` props.
 */

class Field extends React.Component {
    constructor(props) {
        super(props)

        if (props.idForLabel) {
            this.inputId = props.idForLabel
        } else {
            this.inputId = getUniqueId()
        }

        this.isCheckRadio = false
        this.shouldStackLabelInput = this.shouldStackLabelInput.bind(this)
        this.shouldPlaceLabelAtEnd = this.shouldPlaceLabelAtEnd.bind(this)
    }

    shouldStackLabelInput() {
        if (!this.props.labelPosition) {
            return !this.isCheckRadio
        } else {
            return this.props.labelPosition === 'top'
        }
    }

    shouldPlaceLabelAtEnd() {
        if (!this.props.labelPosition) {
            return this.isCheckRadio
        } else {
            return this.props.labelPosition === 'end'
        }
    }

    render() {
        const {
            label,
            hint,
            error,
            caption,
            className,
            children,
            shouldShowErrorsInstantly
        } = this.props

        let childDisabled = false
        let childChecked = false
        const onlyChild = React.Children.count(children) === 1

        const newChildren = React.Children.map(children, (child, idx) => {
            let childProps = {}

            const isFormControl = (
                child.type === 'input' ||
                child.type === 'select' ||
                child.type === 'textarea' ||
                typeof child.type == 'function'  // Custom component, can handle props
            )

            if (isFormControl) {
                childProps = {...this.props.input}
            }

            childProps = {
                ...childProps,
                'aria-invalid': !!error,
                'aria-required': child.props.required,
                ...child.props
            }

            if (child.props.disabled) {
                childDisabled = true
            }

            if (childProps.checked) {
                childChecked = true
            }

            if (error) {
                childProps.className = classNames(child.props.className, 'amp--has-error')
            }

            // Give the first child the id for the field
            if (idx === 0) {
                childProps.id = this.inputId
            }

            if (onlyChild && (child.props.type === 'radio' || child.props.type === 'checkbox')) {
                this.isCheckRadio = true
            }

            if (child.props.required) {
                this.isRequired = true
            }

            return React.cloneElement(child, childProps)
        })

        const metaProps = this.props.meta
        const shouldShowReduxError = metaProps && (metaProps.touched && !metaProps.active || (metaProps.dirty && shouldShowErrorsInstantly))
        const reduxFormError = metaProps && shouldShowReduxError && metaProps.error
        const fieldError = error || reduxFormError

        const classes = classNames('amp-field', {
            'amp--is-check-radio': this.isCheckRadio,
            'amp--error': fieldError,
            'amp--required': this.isRequired,
            'amp--disabled': childDisabled,
            'amp--checked': childChecked
        }, className)

        const innerClasses = classNames('amp-field__inner', {
            'amp--stack': this.shouldStackLabelInput()
        })

        const labelClasses = classNames('amp-field__label-wrap', {
            'amp--end': this.shouldPlaceLabelAtEnd()
        })

        const inputClasses = classNames('amp-field__input')

        return (
            <div className={classes}>
                <div className={innerClasses}>
                    {label &&
                        <div className={labelClasses}>
                            <label
                                className="amp-field__label"
                                htmlFor={this.inputId}
                            >
                                {label}
                            </label>

                            {hint &&
                                <div className="amp-field__hint">
                                    {hint}
                                </div>
                            }
                        </div>
                    }

                    <div className={inputClasses}>
                        {newChildren}
                    </div>
                </div>

                {fieldError &&
                    <div className="amp-field__error">
                        {fieldError}
                    </div>
                }

                {caption &&
                    <div className="amp-field__caption">
                        {caption}
                    </div>
                }
            </div>
        )
    }
}

Field.propTypes = {
    /**
     * The input(s) to include in the field
     */
    children: PropTypes.node.isRequired,

    /**
     * Extra information that may help the user complete this field
     */
    caption: PropTypes.node,

    /**
     * Any extra classes to be added to the component
     */
    className: PropTypes.string,

    /**
     * If this prop is passed in, the amp--error class will be added to the field
     * and the error will be shown
     *
     * Also adds the aria-invalid attribute
     */
    error: PropTypes.node,

    /**
     * Extra information that displays beside the label
     */
    hint: PropTypes.node,

    /**
     * If provided, this will be used as the id attr for the input and the for attr for the label
     *
     * If not provided, an id will be generated and used
     */
    idForLabel: PropTypes.string,

    /**
     * Developers can ignore this prop.
     * If our field is used with redux-form this prop gets passed by redux-form.
     */
    input: PropTypes.object,

    /**
     * The label for the input
     *
     * The id of the input will be used as the 'for' attribute for this label,
     * unless one is already provided
     */
    label: PropTypes.node,

    /**
     * Specify the position of the label. Default behaviour:
     *
     * If the input is a checkbox or radio, the label will display after the input
     *
     * Else, the label will display on top of the input
     */
    labelPosition: PropTypes.oneOf(['top', 'start', 'end']),

    /**
     * Developers can ignore this prop.
     * If our field is used with redux-form this prop gets passed by redux-form.
     */
    meta: PropTypes.object,

    /**
     * Indicates whether to show field errors instantly, i.e. as the user types
     * in a field.
     *
     * Set this to `false` to show errors on blur.
     */
    shouldShowErrorsInstantly: PropTypes.bool
}

export default Field
