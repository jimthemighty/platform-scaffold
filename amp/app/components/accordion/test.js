/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {mount, shallow} from 'enzyme'
import React from 'react'

import {noop} from '../../utils/utils'

import {Accordion, AccordionItem} from './index'
import AccordionItemContent from './accordion-item-content'

/* eslint-disable newline-per-chained-call, max-nested-callbacks */

// Mock `requestAnimationFrame` for tests run using jsDOM
global.requestAnimationFrame = global.window.requestAnimationFrame || function(fn) {
    return setTimeout(fn, 0)
}

describe('Accordion', () => {
    test('renders without errors', () => {
        const wrapper = mount(<Accordion />)
        expect(wrapper.length).toBe(1)
    })

    test('includes the component class name with no className prop', () => {
        const wrapper = shallow(<Accordion />)

        expect(wrapper.hasClass('c-accordion')).toBe(true)
    })

    test('does not render an \'undefined\' class with no className', () => {
        const wrapper = shallow(<Accordion />)

        expect(wrapper.hasClass('undefined')).toBe(false)
    })

    test('renders the contents of the className prop if present', () => {
        [
            'test',
            'test another'
        ].forEach((name) => {
            const wrapper = shallow(<Accordion className={name} />)

            expect(wrapper.hasClass(name)).toBe(true)
        })
    })

    test('sets aria-multiselectable if and only if singleItemOpen is false', () => {
        [true, false].forEach((singleItemOpen) => {
            const wrapper = shallow(<Accordion singleItemOpen={singleItemOpen} />)

            expect(wrapper.prop('aria-multiselectable')).toBe(!singleItemOpen)
        })
    })

    test('passes the callbacks only to AccordionItem children', () => {
        const callbacks = {
            onOpen: () => {},
            onOpened: () => {},
            onClose: () => {},
            onClosed: () => {}
        }
        const wrapper = mount(
            <Accordion {...callbacks}>
                <AccordionItem />
                <p />
                <AccordionItem />
                <hr />
            </Accordion>
        )

        Object.keys(callbacks).forEach((key) => {
            wrapper.find(AccordionItem).forEach((item) => {
                expect(item.prop(key)).toBe(callbacks[key])
            })

            expect(wrapper.find('p').prop(key)).toBeUndefined()
            expect(wrapper.find('hr').prop(key)).toBeUndefined()
        })
    })

    test('does not pass the callback if the child already has that callback', () => {
        const callbacks = {
            onOpen: () => {},
            onOpened: () => {},
            onClose: () => {},
            onClosed: () => {}
        }

        const childCallbacks = {
            onOpen: () => {},
            onOpened: () => {},
            onClose: () => {},
            onClosed: () => {}
        }

        const wrapper = mount(
            <Accordion {...callbacks}>
                <AccordionItem {...childCallbacks} />
                <AccordionItem />
            </Accordion>
        )

        const firstChild = wrapper.childAt(0)
        const secondChild = wrapper.childAt(1)

        Object.keys(childCallbacks).forEach((key) => {
            expect(firstChild.prop(key)).not.toBe(callbacks[key])
            expect(firstChild.prop(key)).toBe(childCallbacks[key])
        })

        Object.keys(callbacks).forEach((key) => {
            expect(secondChild.prop(key)).toBe(callbacks[key])
            expect(secondChild.prop(key)).not.toBe(childCallbacks[key])
        })
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

    test('opens items when they are clicked on', () => {
        const wrapper = mount(
            <Accordion>
                <AccordionItem />
                <AccordionItem />
            </Accordion>
        )

        expect(wrapper.state('openItems')).toEqual([])
        expect(wrapper.find('.pw-accordion').childAt(0).prop('shown')).toBe(false)
        expect(wrapper.find('.pw-accordion').childAt(1).prop('shown')).toBe(false)

        wrapper.find('.pw-accordion').childAt(0).prop('onHeaderClick')()

        expect(wrapper.state('openItems')).toEqual([0])
        expect(wrapper.find('.pw-accordion').childAt(0).prop('shown')).toBe(true)
        expect(wrapper.find('.pw-accordion').childAt(1).prop('shown')).toBe(false)

        wrapper.find('.pw-accordion').childAt(1).prop('onHeaderClick')()

        expect(wrapper.state('openItems')).toEqual([0, 1])
        expect(wrapper.find('.pw-accordion').childAt(0).prop('shown')).toBe(true)
        expect(wrapper.find('.pw-accordion').childAt(1).prop('shown')).toBe(true)
    })

    test('keeps a single item open if singleItemOpen is true', () => {
        const wrapper = mount(
            <Accordion singleItemOpen>
                <AccordionItem />
                <AccordionItem />
            </Accordion>
        )

        expect(wrapper.state('openItems')).toEqual([])
        expect(wrapper.find('.pw-accordion').childAt(0).prop('shown')).toBe(false)
        expect(wrapper.find('.pw-accordion').childAt(1).prop('shown')).toBe(false)

        wrapper.find('.pw-accordion').childAt(0).prop('onHeaderClick')()

        expect(wrapper.state('openItems')).toEqual([0])
        expect(wrapper.find('.pw-accordion').childAt(0).prop('shown')).toBe(true)
        expect(wrapper.find('.pw-accordion').childAt(1).prop('shown')).toBe(false)

        wrapper.find('.pw-accordion').childAt(1).prop('onHeaderClick')()

        expect(wrapper.state('openItems')).toEqual([1])
        expect(wrapper.find('.pw-accordion').childAt(0).prop('shown')).toBe(false)
        expect(wrapper.find('.pw-accordion').childAt(1).prop('shown')).toBe(true)
    })

    test('closes an item if it is tapped while open', () => {
        [false, true].forEach((singleItemOpen) => {
            const wrapper = mount(
                <Accordion singleItemOpen={singleItemOpen}>
                    <AccordionItem />
                </Accordion>
            )

            wrapper.setState({openItems: [0]})
            wrapper.find('.pw-accordion').childAt(0).prop('onHeaderClick')()

            expect(wrapper.state('openItems')).toEqual([])
            expect(wrapper.find('.pw-accordion').childAt(0).prop('shown')).toBe(false)
        })
    })

    test('opens an item intially if it is in initialOpenItems', () => {
        const wrapper = mount(
            <Accordion initialOpenItems={[0]}>
                <AccordionItem />
            </Accordion>
        )
        const openedChild = wrapper.find('.pw-accordion').childAt(0)

        expect(wrapper.state('openItems')).toEqual([0])
        expect(openedChild.prop('shown')).toBe(true)

        // allow enough time to pass to allow the openned child to animate open
        setTimeout(() => {
            expect(openedChild.find('.pw-accordion__content-wrapper').prop('style').maxHeight).not.toBe('0px')
        }, 0)
    })

    describe('open and close item', () => {
        const itemSelector = '.pw-accordion__item'
        const openClass = 'pw-accordion--is-open'
        const buttonClassName = '.pw-accordion__header.c-accordion__header'

        test('calling openItem opens the item', () => {
            const wrapper = mount(<Accordion><AccordionItem /></Accordion>)
            expect(wrapper.find(itemSelector).hasClass(openClass)).toBe(false)
            wrapper.instance().openItem(0)
            expect(wrapper.find(itemSelector).hasClass(openClass)).toBe(true)
        })

        test('calling openItem does not insert the item into openItems multiple times', () => {
            const wrapper = mount(<Accordion><AccordionItem /></Accordion>)
            wrapper.instance().openItem(0)
            wrapper.instance().openItem(0)
            wrapper.find(buttonClassName).simulate('click')
            expect(wrapper.find(itemSelector).hasClass(openClass)).toBe(false)
        })

        test('calling closeItem closes the item', () => {
            const wrapper = mount(<Accordion initialOpenItems={[0]}><AccordionItem /></Accordion>)
            expect(wrapper.find(itemSelector).hasClass(openClass)).toBe(true)
            wrapper.instance().closeItem(0)
            expect(wrapper.find(itemSelector).hasClass(openClass)).toBe(false)
        })

        test('calling closeItem with a closed item does nothing', () => {
            const wrapper = mount(<Accordion initialOpenItems={[0]}><AccordionItem /><AccordionItem /></Accordion>)
            expect(wrapper.state('openItems')).toEqual([0])
            wrapper.instance().closeItem(1)
            expect(wrapper.state('openItems')).toEqual([0])
        })

        test('openItem and closeItems ignore indices out of range', () => {
            ['openItem', 'closeItem'].forEach((fnKey) => {
                [-1, 4].forEach((index) => {
                    const wrapper = mount(<Accordion initialOpenItems={[0, 1]}><AccordionItem /><AccordionItem /><AccordionItem /></Accordion>)
                    expect(wrapper.state('openItems')).toEqual([0, 1])
                    wrapper.instance()[fnKey](index)
                    expect(wrapper.state('openItems')).toEqual([0, 1])
                })
            })
        })

        test('calling openAllItems opens all items', () => {
            const wrapper = mount(<Accordion><AccordionItem /><AccordionItem /></Accordion>)
            expect(wrapper.state('openItems')).toEqual([])
            wrapper.instance().openAllItems()
            expect(wrapper.state('openItems')).toEqual([0, 1])
        })

        test('calling closeAllItems closes all items', () => {
            const wrapper = mount(<Accordion initialOpenItems={[0, 1]}><AccordionItem /><AccordionItem /></Accordion>)
            expect(wrapper.state('openItems')).toEqual([0, 1])
            wrapper.instance().closeAllItems()
            expect(wrapper.state('openItems')).toEqual([])
        })
    })
})

describe('AccordionItem', () => {
    test('renders without errors', () => {
        const wrapper = mount(<AccordionItem />)
        expect(wrapper.length).toBe(1)
    })

    test('includes the component class name with no className prop', () => {
        const wrapper = shallow(<AccordionItem />)

        expect(wrapper.hasClass('c-accordion__item')).toBe(true)
    })

    test('does not render an \'undefined\' class with no className', () => {
        const wrapper = shallow(<AccordionItem />)

        expect(wrapper.hasClass('undefined')).toBe(false)
    })

    test('renders the contents of the className prop if present', () => {
        [
            'test',
            'test another'
        ].forEach((name) => {
            const wrapper = shallow(<AccordionItem className={name} />)

            expect(wrapper.hasClass(name)).toBe(true)
        })
    })

    test('has type="button" set for its header', () => {
        const wrapper = mount(<AccordionItem />)
        expect(wrapper.find('.c-accordion__header').is('[type="button"]')).toBe(true)
    })

    describe('.onClick', () => {
        const buttonClassName = '.pw-accordion__header.c-accordion__header'

        test('closing triggers Accordion\'s click callback', () => {
            const mockHeaderClick = jest.fn()
            const wrapper = mount(<AccordionItem shown onHeaderClick={mockHeaderClick} />)
            expect(mockHeaderClick).not.toHaveBeenCalled()
            wrapper.find(buttonClassName).simulate('click')
            expect(mockHeaderClick).toHaveBeenCalled()
        })

        test('opening triggers Accordion\'s click callback', () => {
            const mockHeaderClick = jest.fn()
            const wrapper = mount(<AccordionItem shown={false} onHeaderClick={mockHeaderClick} />)
            expect(mockHeaderClick).not.toHaveBeenCalled()
            wrapper.find(buttonClassName).simulate('click')
            expect(mockHeaderClick).toHaveBeenCalled()
        })
    })
})

describe('AccordionItemContent', () => {
    test('animates open after entering', () => {
        const props = {
            easing: 'ease-out',
            duration: 500,
            onAnimationComplete: noop
        }

        const wrapper = mount(<AccordionItemContent {...props} />)

        props.onAnimationComplete = () => {
            // This will be called once the content is fully expanded
            const expected = {
                maxHeight: 'initial',
                transition: 'none'
            }
            expect(wrapper.state().style).toEqual(expected)
        }

        expect(wrapper.state().style).toEqual({
            maxHeight: '0px',
            transition: 'none'
        })

        const instance = wrapper.instance()
        instance.componentDidEnter()
    })

    test('animates closed before leaving', () => {
        const props = {
            easing: 'ease-out',
            duration: 500,
            onAnimationComplete: noop
        }

        const wrapper = mount(<AccordionItemContent {...props} />)

        expect(wrapper.state().style).toEqual({
            maxHeight: '0px',
            transition: 'none'
        })

        const instance = wrapper.instance()
        return new Promise((resolve) => {
            instance.componentWillLeave(resolve)
        }).then(() => {
            const expected = {
                maxHeight: '0px',
                transition: 'max-height 0.5s ease-out'
            }
            expect(wrapper.state().style).toEqual(expected)
        })
    })
})
