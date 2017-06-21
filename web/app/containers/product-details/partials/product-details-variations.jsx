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

const variationSwatch = ({input: {value, onChange}, values, label}) => ( // eslint-disable-line
    <div>
        <Swatch
            label={label}
            onChange={(val) => onChange(value = val)}
        >
            {values.map(({label, value}) =>
                <SwatchItem key={value}
                    value={value}
                >
                    {label}
                </SwatchItem>
            )}
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

const ProductDetailsVariations = ({variations}) => (
    <div className={variations.length > 0 && 'u-margin-top-lg'}>
        {variations.map(({id, slug, label, values = []}) => (
            <FieldRow key={id}>
                <ReduxForm.Field
                    label={label}
                    name={slug}
                    values={values}
                    component={variationSwatch}
                />
            </FieldRow>
        ))}
    </div>
)

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