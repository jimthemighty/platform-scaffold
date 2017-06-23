/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getProductVariationCategories} from '../../../store/products/selectors'
import {onVariationChange} from '../actions'

import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Swatch, SwatchItem} from 'progressive-web-sdk/dist/components/swatch'

const variationSwatch = ({input: {value, onChange}, values, label, error, name}) => ( // eslint-disable-line
    <div>
        <Swatch
            label={label}
            onChange={(val) => onChange(value = val)}
            value={value}
            className={error && !value ? 'pw-swatch__error' : ''}
        >
            {values.map(({label, value}) =>
                <SwatchItem key={value}
                    value={value}
                >
                    {label}
                </SwatchItem>
            )}
            {error && !value &&
                <div className="pw-swatch__error">{error[name]}</div>
            }
        </Swatch>
    </div>
)

variationSwatch.propTypes = {
    input: {
        value: PropTypes.string,
        onChange: PropTypes.func
    },
    label: PropTypes.string,
    values: PropTypes.array
}

const ProductDetailsVariations = ({variations, error}) => (
    <div className={variations.length > 0 && 'u-margin-top-lg'}>
        {variations.map(({id, slug, label, values = []}) => (
            <FieldRow key={id} error={error}>
                <ReduxForm.Field
                    label={label}
                    name={slug}
                    values={values}
                    error={error}
                    component={variationSwatch}
                />
            </FieldRow>
        ))}
    </div>
)

ProductDetailsVariations.propTypes = {
    error: PropTypes.object,
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
