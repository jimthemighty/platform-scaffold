/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// import {shallowHOC as shallow} from '../../test-utils'
import {mount} from 'enzyme'
/* eslint-env jest */
import React from 'react'


// Components
// import Tile from '../tile'
// import ListTile from '../list-tile'
import Search from './index.jsx'

test('Search renders without errors', () => {
    const wrapper = mount(<Search lightboxId="id" />)
    expect(wrapper.length).toBe(1)
})

test('if isOverlay is true and lightboxId is required', () => {
    const lightboxIdString = 'lightbox'
    const wrapper = mount(<Search isOverlay lightboxId={lightboxIdString} />)

    expect(wrapper.prop('lightboxId')).toBe(lightboxIdString)
})


//
// /* eslint-disable newline-per-chained-call */
// test('includes the component class name with no className prop', () => {
//     const wrapper = shallow(<Search />)
//
//     expect(wrapper.hasClass('a-search')).toBe(true)
// })
//
// test('does not render an \'undefined\' class with no className', () => {
//     const wrapper = shallow(<Search />)
//
//     expect(wrapper.hasClass('undefined')).toBe(false)
// })
//
// test('renders the contents of the className prop if present', () => {
//     [
//         'test',
//         'test another'
//     ].forEach((name) => {
//         const wrapper = shallow(<Search className={name} />)
//
//         expect(wrapper.hasClass(name)).toBe(true)
//     })
// })
//
// test('has "a--is-overlay" class when isOverlay is true', () => {
//     const wrapper = shallow(<Search isOverlay />)
//
//     expect(wrapper.hasClass('a--is-overlay')).toBe(true)
// })
//
// test('has "a--is-active" class when isOpen is true', () => {
//     const wrapper = mount(<Search />)
//     wrapper.setProps({isOpen: true})
//
//     setTimeout(() => {
//         expect(wrapper.hasClass('a--is-active')).toBe(true)
//     }, 0)
// })
//
// test('clicking on the close button calls onClose', () => {
//     const props = {
//         onClose: jest.fn()
//     }
//     const wrapper = mount(<Search isOverlay {...props} />)
//     const button = wrapper.find('.a-search__button-close .a-button')
//
//     expect(button.length).toBe(1)
//     expect(props.onClose).not.toBeCalled()
//     button.simulate('click')
//     expect(props.onClose).toBeCalled()
// })
//
// test('clicking on the close button set isActive state to false', () => {
//     const wrapper = mount(<Search isOverlay />)
//     const button = wrapper.find('.a-search__button-close .a-button')
//
//     expect(button.length).toBe(1)
//     button.simulate('click')
//     expect(wrapper.state('isActive')).toBe(false)
// })
//
// test('clicking on the overlay calls onClose', () => {
//     const props = {
//         onClose: jest.fn()
//     }
//     const wrapper = mount(<Search isOverlay {...props} />)
//     const overlay = wrapper.find('.a-search__shade')
//
//     expect(overlay.length).toBe(1)
//     expect(props.onClose).not.toBeCalled()
//     overlay.simulate('click')
//     expect(props.onClose).toBeCalled()
// })
//
// test('submitting the form calls onSubmit', () => {
//     const props = {
//         onSubmit: jest.fn()
//     }
//     const wrapper = mount(<Search {...props} />)
//     const form = wrapper.find('.a-search__form')
//
//     expect(form.length).toBe(1)
//     expect(props.onSubmit).not.toBeCalled()
//     form.simulate('submit')
//     expect(props.onSubmit).toBeCalled()
// })
//
// test('clicking on the submit button calls onSubmit', () => {
//     const props = {
//         onSubmit: jest.fn()
//     }
//     const wrapper = mount(<Search {...props} />)
//     const button = wrapper.find('.a-search__button-submit .a-button')
//
//     expect(button.length).toBe(1)
//     expect(props.onSubmit).not.toBeCalled()
//     wrapper.find('.a-search__input').simulate('change', {target: {value: 'test'}})
//     // trigger the click without using simulate accroding to https://github.com/airbnb/enzyme/issues/308#issuecomment-255630011
//     button.get(0).click()
//     expect(props.onSubmit).toBeCalled()
// })
//
// test('state.searchValue is equal to the text that is entered into the input', () => {
//     const wrapper = mount(<Search />)
//     const input = wrapper.find('.a-search__input')
//
//     expect(input.length).toBe(1)
//     input.simulate('change', {target: {value: 'test'}})
//     expect(wrapper.state('searchValue')).toBe('test')
// })
//
// test('changing input calls onChange', () => {
//     const props = {
//         onChange: jest.fn()
//     }
//
//     const wrapper = mount(<Search {...props} />)
//     expect(wrapper.find('.a-search__form').length).toBe(1)
//     expect(props.onChange).not.toBeCalled()
//     wrapper.find('.a-search__input').simulate('change', {target: {value: 'test'}})
//     expect(props.onChange).toBeCalled()
// })
//
// test('there is no close button in inline search', () => {
//     const wrapper = shallow(<Search />)
//
//     expect(wrapper.find('.a-search__button-close').length).toBe(0)
// })
//
// test('focusInput() is called when search overlay is opened', () => {
//     const wrapper = mount(<Search isOverlay />)
//     const instance = wrapper.instance()
//     const mockFocus = jest.fn(instance.focusInput)
//
//     wrapper.setProps({isOpen: true})
//
//     setTimeout(() => {
//         expect(mockFocus).toHaveBeenCalled()
//         expect(wrapper.state('isActive')).toBe(true)
//     }, 0)
// })
//
// test('set searchValue state to empty string when search is closed', () => {
//     const props = {
//         onChange: jest.fn()
//     }
//
//     const wrapper = mount(<Search isOpen {...props} />)
//     wrapper.find('.a-search__input').simulate('change', {target: {value: 'test'}})
//     expect(wrapper.state('searchValue')).toBe('test')
//     wrapper.setProps({isOpen: false})
//     expect(wrapper.state('searchValue')).toBe('')
// })
//
// test('set isActive state to true when input is focused', () => {
//     const wrapper = mount(<Search />)
//
//     expect(wrapper.state('isActive')).toBe(false)
//     wrapper.find('.a-search__input').simulate('focus')
//     expect(wrapper.state('isActive')).toBe(true)
// })
//
// test('set searchValue to empty string when isActive is false', () => {
//     const wrapper = mount(<Search />)
//
//     wrapper.find('.a-search__input').simulate('focus')
//     wrapper.find('.a-search__input').simulate('change', {target: {value: 'test'}})
//     wrapper.find('.a-search__shade').simulate('click')
//     expect(wrapper.state('searchValue')).toBe('')
// })
//
// test('href is passed to the ListTile if href prop is passed to term suggestions', () => {
//     const termSuggestions = [
//         {
//             children: 'test',
//             href: 'http://www.mobify.com'
//         }
//     ]
//     const wrapper = mount(<Search termSuggestions={termSuggestions} />)
//     const term = wrapper.find('.a-search__term-suggestions')
//
//     expect(term.length).toBe(1)
//     expect(term.find(ListTile).prop('href')).toBe('http://www.mobify.com')
// })
//
// test('href is passed to the Tile if href prop is passed to product suggestions', () => {
//     const productSuggestions = [
//         {
//             title: 'test',
//             href: 'http://www.mobify.com'
//         }
//     ]
//     const wrapper = mount(<Search productSuggestions={productSuggestions} />)
//     const product = wrapper.find('.a-search__product-suggestions')
//
//     expect(product.find(Tile).prop('href')).toBe('http://www.mobify.com')
// })
//
// test('clicking on the term search suggestion calls onClickSuggestion', () => {
//     const props = {
//         onClickSuggestion: jest.fn(),
//         termSuggestions: [
//             {
//                 children: 'test'
//             }
//         ]
//     }
//     const wrapper = mount(<Search {...props} />)
//     const listPrimary = wrapper.find('.a-list-tile__primary')
//
//     expect(listPrimary.length).toBe(1)
//     expect(props.onClickSuggestion).not.toBeCalled()
//     listPrimary.simulate('click')
//     expect(props.onClickSuggestion).toBeCalled()
// })
//
// test('clicking on product suggestion calls onClickSuggestion', () => {
//     const props = {
//         onClickSuggestion: jest.fn(),
//         productSuggestions: [
//             {
//                 title: 'test'
//             }
//         ]
//     }
//     const wrapper = mount(<Search {...props} />)
//     const tilePrimary = wrapper.find('.a-tile__primary').first()
//
//     expect(tilePrimary.length).toBe(1)
//     expect(props.onClickSuggestion).not.toBeCalled()
//     tilePrimary.simulate('click')
//     expect(props.onClickSuggestion).toBeCalled()
// })
//
// test('Clear search query button appears when there\'s text input', () => {
//     const wrapper = mount(<Search />)
//     const input = wrapper.find('.a-search__input')
//     const clearButton = wrapper.find('.a-search__button-clear .a-button')
//
//     expect(input.length).toBe(1)
//     expect(clearButton.length).toBe(0)
//     input.simulate('change', {target: {value: 'test'}})
//     setTimeout(() => {
//         expect(clearButton.length).toBe(1)
//     }, 0)
// })
//
// test('Clear search input when clear button is clicked', () => {
//     const wrapper = mount(<Search />)
//     const input = wrapper.find('.a-search__input')
//     const clearButton = wrapper.find('.a-search__button-clear .a-button')
//
//     expect(wrapper.state('searchValue')).toBe('')
//     input.simulate('change', {target: {value: 'test'}})
//     expect(wrapper.state('searchValue')).toBe('test')
//     setTimeout(() => {
//         clearButton.simulate('click')
//         expect(wrapper.state('searchValue')).toBe('')
//         expect(clearButton.length).toBe(0)
//     }, 0)
// })
//
// test('resetInput is called when clear search input button is clicked', () => {
//     const props = {
//         onClear: jest.fn()
//     }
//     const wrapper = mount(<Search {...props} />)
//     const instance = wrapper.instance()
//     const mockReset = jest.fn(instance.resetInput)
//     const mockClear = jest.fn(instance.clearInput)
//
//     instance.clearInput = mockClear
//     instance.resetInput = mockReset
//
//     wrapper.setState({
//         searchValue: 'test'
//     })
//
//     const clearButton = wrapper.find('.a-search__button-clear .a-button')
//
//     expect(mockClear).not.toHaveBeenCalled()
//     expect(mockReset).not.toHaveBeenCalled()
//     expect(props.onClear).not.toBeCalled()
//     clearButton.simulate('click')
//     expect(mockClear).toHaveBeenCalled()
//     expect(mockReset).toHaveBeenCalled()
//     expect(props.onClear).toBeCalled()
// })
