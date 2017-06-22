/* eslint-disable newline-per-chained-call, max-nested-callbacks */
import {mount, shallow as _shallow} from 'enzyme'
import React from 'react'

import {Accordion, AccordionItem} from './index'


const shallow = (component) => _shallow(component).first().shallow()


describe('Accordion', () => {
    test('renders without errors', () => {
        const wrapper = mount(<Accordion />)
        expect(wrapper.length).toBe(1)
    })

    test('includes the component class name with no className prop', () => {
        const wrapper = mount(<Accordion />)
        expect(wrapper.hasClass('amp-accordion')).toBe(true)
    })

    test('does not render an \'undefined\' class with no className', () => {
        const wrapper = mount(<Accordion />)

        expect(wrapper.hasClass('undefined')).toBe(false)
    })

    test('renders the contents of the className prop if present', () => {
        const name = 'test'
        const wrapper = mount(<Accordion className={name} />)
        expect(wrapper.hasClass(name)).toBe(true)
    })

    test('works correctly with falsy children', () => {
        const wrapper = shallow(
            <Accordion>
                {false}
                <p />
                {undefined}
            </Accordion>
        )
        expect(wrapper.length).toBe(1)
    })

    test('opens an item intially if it is in initialOpenItems', () => {
        const wrapper = mount(
            <Accordion initialOpenItems={[1]}>
                <AccordionItem>One</AccordionItem>
                <AccordionItem>Two</AccordionItem>
            </Accordion>
        )

        const children = wrapper.find('.amp-accordion__item')
        expect(children.length).toBe(2)
        const [first, second] = children

        expect(first.hasAttribute('expanded')).toBe(false)
        expect(second.hasAttribute('expanded')).toBe(true)
    })
})

describe('AccordionItem', () => {
    test('renders without errors', () => {
        const wrapper = shallow(<AccordionItem />)
        expect(wrapper.length).toBe(1)
    })

    test('includes the component class name with no className prop', () => {
        const wrapper = shallow(<AccordionItem />)
        expect(wrapper.hasClass('amp-accordion__item')).toBe(true)
    })

    test('does not render an \'undefined\' class with no className', () => {
        const wrapper = shallow(<AccordionItem />)
        expect(wrapper.hasClass('undefined')).toBe(false)
    })

    test('renders the contents of the className prop if present', () => {
        const name = 'test'
        const wrapper = shallow(<AccordionItem className={name} />)
        expect(wrapper.hasClass(name)).toBe(true)
    })
})
