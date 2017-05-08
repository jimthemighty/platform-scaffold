import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getProductVariationCategories} from '../../../store/products/selectors'
import {onVariationChange} from '../actions'

import Field from 'progressive-web-sdk/dist/components/field'

const ProductDetailsVariations = ({variations, onVariationChange}) => {
    const getInitialValue = (values) => {
        return values[0].value
    }
    return (
        <div>
            {variations.map(({id, label, values = []}) => (
                <ReduxForm.Field
                    label={label}
                    name={id}
                    initialValues={getInitialValue(values)}
                    component={Field}
                    key={id}
                    className="u-margin-bottom-lg u-margin-top"
                    customEventHandlers={{
                        onChange: onVariationChange
                    }}
                >
                    <select name={id}>
                        {/* Include an empty option to show by default */}
                        <option />
                        {values.map(({label, value}) => <option value={value} key={value}>{label}</option>)}
                    </select>
                </ReduxForm.Field>
            ))}
        </div>
    )
}

ProductDetailsVariations.propTypes = {
    variations: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string
        }))
    })),
    onVariationChange: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    variations: getProductVariationCategories
})

const mapDispatchToProps = {
    onVariationChange
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsVariations)
