/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {shallowHOC as shallow} from '../../test-utils'
import React from 'react'

const noop = () => undefined

import Field from './index'

/* eslint-disable newline-per-chained-call */

test('Field renders without errors', () => {
    const wrapper = shallow(<Field><input type="checkbox" /></Field>)
    expect(wrapper.length).toBe(1)
})

test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Field><input type="checkbox" /></Field>)
    expect(wrapper.hasClass('a-field')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Field><input type="checkbox" /></Field>)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    const name = 'name'
    const wrapper = shallow(<Field className={name}><input type="checkbox" /></Field>)
    expect(wrapper.hasClass(name)).toBe(true)
})

test('passes the idForLabel prop to the label', () => {
    const wrapper = shallow(<Field idForLabel="testing" label="Test"><input type="checkbox" /></Field>)

    expect(wrapper.find('label').prop('htmlFor')).toBe('testing')
    expect(wrapper.find('label').text()).toBe('Test')
    expect(wrapper.find('input').prop('id')).toBe('testing')
})

test('sets the label position', () => {
    const setLabelPositionToAndExpect = (position, hasStackClass, hasEndClass) => {
        const wrapper = shallow(<Field label="Test" labelPosition={position}><input type="checkbox" /></Field>)
        expect(wrapper.find('.a-field__inner').hasClass('a--stack')).toBe(hasStackClass)
        expect(wrapper.find('.a-field__label-wrap').hasClass('a--end')).toBe(hasEndClass)
    }
    setLabelPositionToAndExpect('start', false, false)
    setLabelPositionToAndExpect('top', true, false)
    setLabelPositionToAndExpect('end', false, true)
})

test('has the class a--required if the input is required', () => {
    const wrapper = shallow(<Field><input type="text" required /></Field>)

    expect(wrapper.find('.a-field').hasClass('a--required')).toBe(true)
})

test('does not have the class a--required if the input is not required', () => {
    const wrapper = shallow(<Field><input type="text" /></Field>)

    expect(wrapper.find('.a-field').hasClass('a--required')).toBe(false)
})

test('passes the `input` prop contents to the input', () => {
    const inputProps = {
        test: true,
        onClick: () => {}
    }
    const wrapper = shallow(<Field input={inputProps}><input /></Field>)

    const formControl = wrapper.find('input')

    expect(formControl.prop('test')).toBe(true)
    expect(formControl.prop('onClick')).toBe(inputProps.onClick)
})

test('passes the `input` prop contents to the select', () => {
    const inputProps = {
        test: true,
        onClick: () => {}
    }
    const wrapper = shallow(<Field input={inputProps}><select /></Field>)

    const formControl = wrapper.find('select')

    expect(formControl.prop('test')).toBe(true)
    expect(formControl.prop('onClick')).toBe(inputProps.onClick)
})

test('passes the `input` prop contents to the textarea', () => {
    const inputProps = {
        test: true,
        onClick: () => {}
    }
    const wrapper = shallow(<Field input={inputProps}><textarea /></Field>)

    const formControl = wrapper.find('textarea')

    expect(formControl.prop('test')).toBe(true)
    expect(formControl.prop('onClick')).toBe(inputProps.onClick)
})

test('passes the `input` prop contents to the custom component', () => {
    const FormComponent = () => {}
    const inputProps = {
        test: true,
        onClick: () => {}
    }
    const wrapper = shallow(<Field input={inputProps}><FormComponent /></Field>)

    const formControl = wrapper.find(FormComponent)

    expect(formControl.prop('test')).toBe(true)
    expect(formControl.prop('onClick')).toBe(inputProps.onClick)
})

test('does not set the id or input props on a non-input', () => {
    const inputProps = {
        test: true,
        onClick: () => {}
    }
    const wrapper = shallow(<Field input={inputProps} idForLabel={'thing'}><input /><p id="paragraph" /></Field>)

    const nonInput = wrapper.find('p')

    expect(nonInput.prop('test')).toBeUndefined()
    expect(nonInput.prop('onClick')).toBeUndefined()
    expect(nonInput.prop('id')).toBe('paragraph')
})

test('does not render caption, error, or hint if not passed', () => {
    const wrapper = shallow(<Field><input /></Field>)

    expect(wrapper.find('.a-field__caption').length).toBe(0)
    expect(wrapper.find('.a-field__error').length).toBe(0)
    expect(wrapper.find('.a-field__hint').length).toBe(0)
})

test('renders the caption if passed', () => {
    const wrapper = shallow(<Field caption="A caption"><input /></Field>)

    expect(wrapper.find('.a-field__caption').length).toBe(1)
    expect(wrapper.find('.a-field__caption').text()).toBe('A caption')
})

test('renders the error if passed', () => {
    const wrapper = shallow(<Field error="Not Valid"><input /></Field>)

    expect(wrapper.find('.a-field__error').length).toBe(1)
    expect(wrapper.find('.a-field__error').text()).toBe('Not Valid')
})

test('renders a hint in the label if passed with a label', () => {
    const wrapper = shallow(<Field hint="Look under the rock" label="Test"><input /></Field>)

    expect(wrapper.find('.a-field__label-wrap .a-field__hint').length).toBe(1)
    expect(wrapper.find('.a-field__label-wrap .a-field__hint').text())
        .toBe('Look under the rock')
})

test('renders no hint if no label is passed', () => {
    const wrapper = shallow(<Field hint="Look under the rock"><input /></Field>)

    expect(wrapper.find('.a-field__label-wrap .a-field__hint').length).toBe(0)
})

test('renders the redux form error if the field is touched and inactive', () => {
    const metaProps = {
        touched: true,
        active: false,
        error: 'redux form error'
    }
    const wrapper = shallow(<Field meta={metaProps}><input /></Field>)

    expect(wrapper.find('.a-field__error').length).toBe(1)
    expect(wrapper.find('.a-field__error').text()).toBe('redux form error')
})

test('does not render the redux form error if the field is not touched or active', () => {
    [{touched: false, active: false}, {touched: true, active: true}].forEach((state) => {
        const wrapper = shallow(<Field meta={{...state, error: 'redux form error'}}><input /></Field>)

        expect(wrapper.find('.a-field__error').length).toBe(0)
    })
})

test('renders the redux form error if dirty and shouldShowErrorsInstantly is set', () => {
    const metaProps = {
        dirty: true,
        error: 'redux form error'
    }
    const wrapper = shallow(<Field meta={metaProps} shouldShowErrorsInstantly><input /></Field>)

    expect(wrapper.find('.a-field__error').length).toBe(1)
    expect(wrapper.find('.a-field__error').text()).toBe('redux form error')
})

test('renders no redux form error if not dirty and shouldShowErrorsInstantly is set', () => {
    const metaProps = {
        dirty: false,
        error: 'redux form error'
    }
    const wrapper = shallow(<Field meta={metaProps} shouldShowErrorsInstantly><input /></Field>)

    expect(wrapper.find('.a-field__error').length).toBe(0)
})

test('calls redux form onBlur handler when custom event is passed', () => {
    const reduxOnBlur = jest.fn()
    const customOnBlur = noop
    const inputProps = {
        onBlur: reduxOnBlur
    }
    const wrapper = shallow(<Field input={inputProps} customEventHandlers={{onBlur: customOnBlur}}><input type="text" /></Field>)

    wrapper.find('input').simulate('blur')

    expect(reduxOnBlur).toBeCalled()
})

test('sets the disabled class if a child is disabled', () => {
    const wrapper = shallow(<Field><input type="text" disabled /></Field>)

    expect(wrapper.hasClass('a--disabled')).toBe(true)
})

test('sets the checked class if a child is checked', () => {
    const wrapper = shallow(<Field><input type="radio" checked /></Field>)

    expect(wrapper.hasClass('a--checked')).toBe(true)
})
