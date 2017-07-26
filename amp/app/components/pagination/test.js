/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {shallowHOC as shallow} from 'mobify-amp-sdk/dist/test-utils'
import {mount} from 'enzyme'
/* eslint-env jest */
import React from 'react'

// Components
import Pagination from './index.jsx'
import Button from 'mobify-amp-sdk/dist/components/button' // change to '../button' when move to SDK

/* eslint-disable newline-per-chained-call */

test('Pagination renders without errors', () => {
    const props = {
        currentPage: 1,
        pageCount: 5
    }
    const wrapper = mount(<Pagination {...props} />)
    expect(wrapper.length).toBe(1)
})


test('includes the component class name with no className prop', () => {
    const props = {
        currentPage: 1,
        pageCount: 5
    }
    const wrapper = shallow(<Pagination {...props} />)

    expect(wrapper.hasClass('a-pagination')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const props = {
        currentPage: 1,
        pageCount: 5
    }
    const wrapper = shallow(<Pagination {...props} />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const props = {
            currentPage: 1,
            pageCount: 5
        }
        const wrapper = shallow(<Pagination className={name} {...props} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})

test('renders the correct number of pages with the correct contents', () => {
    const props = {
        currentPage: 1,
        pageCount: 5
    }
    const wrapper = shallow(<Pagination {...props} />)
    expect(wrapper.find('.a-pagination__page').length).toBe(props.pageCount)

    wrapper.find('.a-pagination__page').forEach((page, idx) => {
        expect(page.type()).toBe(Button)
        expect(page.contains(wrapper.instance().props.getPageButtonMessage(idx + 1))).toBe(true)

        if (idx === 0) {
            expect(page.hasClass('a--active')).toBe(true)
        }
    })
})

test('renders the correct pages at the start if pagesToShow is passed', () => {
    const props = {
        currentPage: 1,
        pageCount: 5,
        pagesToShow: 3
    }
    const wrapper = shallow(<Pagination {...props} />)
    expect(wrapper.find('.a-pagination__page').length).toBe(props.pagesToShow)

    wrapper.find('.a-pagination__page').forEach((page, idx) => {
        expect(page.type()).toBe(Button)
        expect(page.contains(wrapper.instance().props.getPageButtonMessage(idx + 1))).toBe(true)

        if (idx === 0) {
            expect(page.hasClass('a--active')).toBe(true)
        }
    })
})

test('renders the correct pages at the end if pagesToShow is passed', () => {
    const props = {
        currentPage: 5,
        pageCount: 5,
        pagesToShow: 3
    }
    const wrapper = shallow(<Pagination {...props} />)
    expect(wrapper.find('.a-pagination__page').length).toBe(props.pagesToShow)

    wrapper.find('.a-pagination__page').forEach((page, idx) => {
        expect(page.type()).toBe(Button)
        expect(page.contains(wrapper.instance().props.getPageButtonMessage(idx + 3))).toBe(true)

        if (idx === 5) {
            expect(page.hasClass('a--active')).toBe(true)
        }
    })
})

test('renders a previous button by default', () => {
    const props = {
        currentPage: 2,
        pageCount: 5
    }

    const wrapper = mount(<Pagination {...props} />)
    const prevButton = wrapper.children().filter(Button).first()
    expect(prevButton.length).toBe(1)
    expect(prevButton.text()).toBe('Prev')
})

test('renders a next button by default', () => {
    const props = {
        currentPage: 2,
        pageCount: 5
    }

    const wrapper = mount(<Pagination {...props} />)
    const nextButton = wrapper.children().filter(Button).last()
    expect(nextButton.length).toBe(1)
    expect(nextButton.text()).toBe('Next')
})

test('renders a first button if specified', () => {
    const props = {
        currentPage: 4,
        pageCount: 5,
        firstButton: {
            text: 'First',
            props: {className: 'first-button-class'}
        }
    }

    const wrapper = mount(<Pagination {...props} />)
    const buttons = wrapper.children().filter(Button)
    expect(buttons.length).toBe(3)
    const firstButton = buttons.first()
    expect(firstButton.text()).toBe('First')
    expect(firstButton.prop('className')).toBe('first-button-class')
})

test('renders a last button if specified', () => {
    const props = {
        currentPage: 3,
        pageCount: 5,
        lastButton: {
            text: 'Last',
            props: {className: 'last-button-class'}
        }
    }

    const wrapper = mount(<Pagination {...props} />)
    const buttons = wrapper.children().filter(Button)
    expect(buttons.length).toBe(3)
    const lastButton = buttons.last()
    expect(lastButton.text()).toBe('Last')
    expect(lastButton.prop('className')).toBe('last-button-class')
})


test('renders no direction buttons if they are suppressed', () => {
    const props = {
        currentPage: 1,
        pageCount: 5,
        nextButton: null,
        prevButton: null
    }

    const wrapper = mount(<Pagination {...props} />)
    expect(wrapper.children().filter(Button).length).toBe(0)
})

test('renders no page buttons if showPageButtons is false', () => {
    const props = {
        currentPage: 1,
        pageCount: 5,
        showPageButtons: false
    }

    const wrapper = shallow(<Pagination {...props} />)
    expect(wrapper.find('.a-pagination__content').find(Button).length).toBe(0)
})

test('only renders as many pages as pageCount allows despite pagesToShow', () => {
    const props = {
        currentPage: 1,
        pageCount: 5,
        pagesToShow: 10
    }
    const wrapper = mount(<Pagination {...props} />)
    expect(wrapper.find('.a-pagination__page').length).toBe(props.pageCount)
})

test('validates the pagesToShow prop', () => {
    // pagesToShow must be >= pagesToShowAtStart + pagesToShowAtEnd
    const props = {
        currentPage: 5,
        pageCount: 10,
        pagesToShowAtStart: 4,
        pagesToShowAtEnd: 4,
        pagesToShow: 7
    }

    const consoleError = console.error
    console.error = jest.fn()

    try {
        const wrapper = mount(<Pagination {...props} />)
        expect(console.error).toBeCalled()
        // ignores pagesToShowAtStart and pagesToShowAtEnd
        expect(wrapper.find('.a-pagination__ellipsis').length).toBe(0)
        // ignores pagesToShow
        expect(wrapper.find('.a-pagination__page').length).toBe(props.pageCount)
    } finally {
        console.error = consoleError
    }
})

test('renders static pages at the start and end if pagesToShowAtStart and pagesToShowAtEnd are passed', () => {
    const props = {
        currentPage: 5,
        pageCount: 10,
        pagesToShowAtStart: 2,
        pagesToShowAtEnd: 2,
        pagesToShow: 7
    }
    // Should look like 1 2 ... 4 5 6 ... 9 10
    const wrapper = mount(<Pagination {...props} />)
    expect(wrapper.find('.a-pagination__ellipsis').length).toBe(2)
    expect(wrapper.find('.a-pagination__page').length).toBe(props.pagesToShow)
})

test('renders no ellipses when pageCount is equal to pagesToShowAtStart and pagesToShowAtend combined', () => {
    const props = {
        currentPage: 3,
        pageCount: 7,
        pagesToShowAtStart: 2,
        pagesToShowAtEnd: 2,
        pagesToShow: 4
    }

    // Should look like 1 2 3 4 5 6 7
    const wrapper = mount(<Pagination {...props} />)
    expect(wrapper.find('.a-pagination__ellipsis').length).toBe(0)
})

test('renders the correct active page number when there is only one page in the chunk', () => {
    const props = {
        currentPage: 4,
        pageCount: 7,
        pagesToShowAtStart: 2,
        pagesToShowAtEnd: 2,
        pagesToShow: 5
    }

    // Should look like 1 2 .. 4 .. 6 7
    const wrapper = mount(<Pagination {...props} />)
    expect(wrapper.find('.a-pagination__ellipsis').length).toBe(2)
    const activePage = wrapper.find('.a--active')
    expect(activePage.text()).toBe('Page 4')
})

test('has "a--select-pagination" class when isSelect is true', () => {
    const props = {
        currentPage: 5,
        pageCount: 10,
        pagesToShowAtStart: 4,
        pagesToShowAtEnd: 4,
        pagesToShow: 7,
        isSelect: true
    }
    const wrapper = shallow(<Pagination {...props} />)

    expect(wrapper.hasClass('a--select-pagination')).toBe(true)
})
