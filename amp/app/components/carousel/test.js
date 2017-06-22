/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable jsx-a11y/img-has-alt */

import {mount, shallow} from 'enzyme'
import React from 'react'

import Link from '../link'

import Carousel from './index.jsx'
import CarouselItem from './carousel-item.jsx'

/* eslint-disable newline-per-chained-call, max-nested-callbacks */

describe('Carousel', () => {
    test('renders properly', () => {
        const wrapper = mount(
            <Carousel>
                <CarouselItem caption="Item 1">
                    <img src="/img1.jpg" />
                </CarouselItem>
                <CarouselItem caption="Item 2">
                    <img src="/img2.jpg" />
                </CarouselItem>
                <CarouselItem caption="Item 3">
                    <img src="/img3.jpg" />
                </CarouselItem>
            </Carousel>
        )

        const carouselItems = wrapper.find('.c-carousel__item')
        expect(carouselItems.length).toBe(3)

        const middleItem = carouselItems.at(1)

        const middleItemClassName = middleItem.prop('className')
        expect(middleItemClassName.includes('c--active')).toBe(true)

        expect(middleItem.find('img').prop('src')).toBe('/img1.jpg')
    })

    test('includes the component class name with no className prop', () => {
        const wrapper = shallow(<Carousel><CarouselItem /></Carousel>)

        expect(wrapper.hasClass('pw-carousel')).toBe(true)
    })

    test('only one carouselItems if there is only one item', () => {
        const wrapper = mount(
            <Carousel>
                <CarouselItem caption="Item 1">
                    <img src="/img1.jpg" />
                </CarouselItem>
            </Carousel>
        )

        const carouselItems = wrapper.find(CarouselItem)
        expect(carouselItems.length).toBe(1)
    })

    test('three carouselItems if there are only two items', () => {
        const wrapper = mount(
            <Carousel>
                <CarouselItem caption="Item 1">
                    <img src="/img1.jpg" />
                </CarouselItem>
                <CarouselItem caption="Item 2">
                    <img src="/img2.jpg" />
                </CarouselItem>
            </Carousel>
        )

        const carouselItems = wrapper.find(CarouselItem)
        expect(carouselItems.length).toBe(3)
    })

    test('adjusts cur/prev/next indices when carouselItems length changes', () => {
        const wrapper = mount(<Carousel><CarouselItem /></Carousel>)
        expect(wrapper.state('currentIndex')).toBe(0)
        expect(wrapper.state('prevIndex')).toBe(0)
        expect(wrapper.state('nextIndex')).toBe(0);

        [2, 3, 4, 5].forEach((childCount) => {
            const children = new Array(childCount).fill(0).map((_, idx) => (
                <CarouselItem key={idx} />
            ))
            wrapper.setProps({children})

            expect(wrapper.state('currentIndex')).toBe(0)
            expect(wrapper.state('prevIndex')).toBe(childCount - 1)
            expect(wrapper.state('nextIndex')).toBe(1)
        })
    })

    test('does not adjust current/prev/next indices when carouselItems length does not change', () => {
        const wrapper = mount(<Carousel><CarouselItem /><CarouselItem /><CarouselItem /></Carousel>)
        expect(wrapper.state('currentIndex')).toBe(0)
        expect(wrapper.state('prevIndex')).toBe(2)
        expect(wrapper.state('nextIndex')).toBe(1)


        wrapper.setProps({previousIcon: 'plus'})

        expect(wrapper.state('currentIndex')).toBe(0)
        expect(wrapper.state('prevIndex')).toBe(2)
        expect(wrapper.state('nextIndex')).toBe(1)
    })

    test('does not render an \'undefined\' class with no className', () => {
        const wrapper = shallow(<Carousel><CarouselItem /></Carousel>)

        expect(wrapper.hasClass('undefined')).toBe(false)
    })

    test('renders the contents of the className prop if present', () => {
        [
            'test',
            'test another'
        ].forEach((name) => {
            const wrapper = shallow(<Carousel className={name}><CarouselItem /></Carousel>)

            expect(wrapper.hasClass(name)).toBe(true)
        })
    })

    test('renders nothing with no children', () => {
        const wrapper = shallow(<Carousel />)

        expect(wrapper.type()).toBe(null)
    })

    test('renders controls by default', () => {
        const wrapper = shallow(<Carousel><CarouselItem /></Carousel>)

        expect(wrapper.find('.pw-carousel__controls').length).toBe(1)
    })

    test('does not render controls if showControls is false', () => {
        const wrapper = shallow(<Carousel showControls={false}><CarouselItem /></Carousel>)

        expect(wrapper.find('.pw-carousel__controls').length).toBe(0)
    })

    test('renders a pip for each child', () => {
        [2, 3, 4, 5, 6].forEach((childCount) => {
            const children = new Array(childCount).fill(0).map((_, idx) => (
                <CarouselItem key={idx} />
            ))
            const wrapper = shallow(<Carousel>{children}</Carousel>)
            expect(wrapper.find('CarouselPip').length).toBe(childCount)
        })
    })

    test('renders no caption by default', () => {
        const wrapper = shallow(<Carousel><CarouselItem /></Carousel>)

        expect(wrapper.find('.pw-carousel__caption').length).toBe(0)
    })

    test('renders the caption if showCaption is true', () => {
        const wrapper = shallow(<Carousel showCaption><CarouselItem /></Carousel>)

        expect(wrapper.find('.pw-carousel__caption').length).toBe(1)
    })

    test('mouse handlers are rendered on the inner wrapper', () => {
        const wrapper = shallow(<Carousel><CarouselItem /></Carousel>)

        const innerWrapper = wrapper.find('.pw-carousel__inner')
        expect(innerWrapper.prop('onTouchStart')).toBeUndefined()
        expect(innerWrapper.prop('onTouchMove')).toBeUndefined()
        expect(innerWrapper.prop('onTouchEnd')).toBeUndefined()

        expect(innerWrapper.prop('onMouseDown')).toBeInstanceOf(Function)
        expect(innerWrapper.prop('onMouseMove')).toBeInstanceOf(Function)
        expect(innerWrapper.prop('onMouseUp')).toBeInstanceOf(Function)
    })

    test('onDownHandler does nothing if the animate flag is set', () => {
        const wrapper = mount(<Carousel><CarouselItem /></Carousel>)
        const mockEvent = {preventDefault: jest.fn()}

        wrapper.setState({animate: true})
        const previousState = {...wrapper.state()}
        wrapper.instance().onDownHandler(mockEvent)
        expect(wrapper.state()).toEqual(previousState)
        expect(mockEvent.preventDefault).toBeCalled()
    })

    test('onDownHandler sets the dragging flag and start position in the state', () => {
        const wrapper = mount(<Carousel><CarouselItem /></Carousel>)
        const mockEvent = {nativeEvent: {clientX: 50, clientY: 100}}

        wrapper.instance().onDownHandler(mockEvent)
        expect(wrapper.state('dragging')).toBe(true)
        expect(wrapper.state('dragStartX')).toBe(50)
    })

    test('onUpHandler clears the dragging flag if deltaX is zero or undefined', () => {
        [0, undefined].forEach((deltaX) => {
            const wrapper = mount(<Carousel><CarouselItem /></Carousel>)

            wrapper.setState({deltaX, dragging: true})
            wrapper.instance().onUpHandler()
            expect(wrapper.state('dragging')).toBe(false)
        })
    })

    test('onUpHandler clears dragging and sets animate if abs(deltaX) is under the moveThreshold', () => {
        [-10, 10].forEach((deltaX) => {
            const wrapper = mount(<Carousel moveThreshold={20}><CarouselItem /></Carousel>)

            wrapper.setState({deltaX, dragging: true})
            wrapper.instance().onUpHandler()
            expect(wrapper.state('dragging')).toBe(false)
            expect(wrapper.state('animate')).toBe(true)
            expect(wrapper.state('deltaX')).toBe(0)
        })
    })

    test('onUpHandler clears the dragging flag and animates when deltaX exceeds the moveThreshold', () => {
        [1, -1].forEach((sign) => {
            const wrapper = mount(<Carousel moveThreshold={20}><CarouselItem /></Carousel>)

            wrapper.setState({deltaX: 30 * sign, dragging: true, itemWidth: 200})
            wrapper.instance().onUpHandler()
            expect(wrapper.state('dragging')).toBe(false)
            expect(wrapper.state('animate')).toBe(true)
            expect(wrapper.state('deltaX')).toBe(200 * sign)
        })
    })

    test('onMoveHandler does nothing if the dragging flag is not set', () => {
        const wrapper = mount(<Carousel><CarouselItem /></Carousel>)

        wrapper.setState({dragging: false})
        const previousState = {...wrapper.state()}
        wrapper.instance().onMoveHandler({nativeEvent: {}})
        expect(wrapper.state()).toEqual(previousState)
    })

    test('onMoveHandler does nothing if the deltaX is under threshold', () => {
        [-1, 1].forEach((sign) => {
            const wrapper = mount(<Carousel dragThreshold={20}><CarouselItem /></Carousel>)

            wrapper.setState({dragging: true, dragStartX: 0})
            const previousState = {...wrapper.state()}
            wrapper.instance().onMoveHandler({nativeEvent: {clientX: 10 * sign}})
            expect(wrapper.state()).toEqual(previousState)
        })
    })

    test('onMoveHandler does nothing if the end of the carousel is reached', () => {
        [-1, 1].forEach((sign) => {
            const wrapper = mount(<Carousel dragThreshold={20}><CarouselItem /><CarouselItem /></Carousel>)

            wrapper.setState({
                dragging: true,
                dragStartX: 0,
                currentIndex: sign > 0 ? 0 : 1
            })
            const previousState = {...wrapper.state()}
            wrapper.instance().onMoveHandler({nativeEvent: {clientX: 30 * sign}})
            expect(wrapper.state()).toEqual(previousState)
        })
    })

    test('onMoveHandler sets the deltaX if the end of the carousel is not reached', () => {
        [-1, 1].forEach((sign) => {
            const wrapper = mount(<Carousel dragThreshold={20}><CarouselItem /><CarouselItem /></Carousel>)

            wrapper.setState({
                dragging: true,
                dragStartX: 0,
                currentIndex: sign < 0 ? 0 : 1
            })
            wrapper.instance().onMoveHandler({nativeEvent: {clientX: 30 * sign}})
            expect(wrapper.state('deltaX')).toEqual(10 * sign)
        })
    })

    test('onLeaveHandler does nothing if no drag is in progress', () => {
        const wrapper = mount(<Carousel><CarouselItem /></Carousel>)

        expect(wrapper.state('dragging')).toBe(false)
        const previousState = {...wrapper.state()}
        wrapper.instance().onLeaveHandler()
        expect(wrapper.state()).toEqual(previousState)
    })

    test('onLeaveHandler generates a mouse up if a drag is in progress', () => {
        const mockHandler = jest.fn()
        const wrapper = mount(<Carousel><CarouselItem /></Carousel>)

        wrapper.setState({dragging: true})
        wrapper.instance().onUpHandler = mockHandler
        wrapper.instance().onLeaveHandler()
        expect(mockHandler).toBeCalled()
    })

    test('clicking on the previous button sets the animate flag and deltaX', () => {
        const wrapper = mount(<Carousel><CarouselItem /><CarouselItem /></Carousel>)

        wrapper.setState({currentIndex: 1, itemWidth: 100})
        wrapper.find('.pw-carousel__previous button').simulate('click')
        expect(wrapper.state('animate')).toBe(true)
        expect(wrapper.state('deltaX')).toBe(100)
    })

    test('clicking on the next button sets the animate flag and deltaX', () => {
        const wrapper = mount(<Carousel><CarouselItem /><CarouselItem /></Carousel>)

        wrapper.setState({currentIndex: 0, itemWidth: 100})
        wrapper.find('.pw-carousel__next button').simulate('click')
        expect(wrapper.state('animate')).toBe(true)
        expect(wrapper.state('deltaX')).toBe(-100)
    })

    test('moveComplete only clears the animate flag if deltaX is 0 or undefined', () => {
        [0, undefined].forEach((deltaX) => {
            const wrapper = mount(<Carousel><CarouselItem /><CarouselItem /><CarouselItem /></Carousel>)

            wrapper.setState({
                deltaX,
                animate: true,
                currentIndex: 0,
                nextIndex: 1,
                prevIndex: 2
            })
            wrapper.instance().moveComplete()
            expect(wrapper.state('animate')).toBe(false)
            expect(wrapper.state('currentIndex')).toBe(0)
            expect(wrapper.state('nextIndex')).toBe(1)
            expect(wrapper.state('prevIndex')).toBe(2)
        })
    })

    test('moveComplete advances the indices if deltaX is negative', () => {
        const wrapper = mount(<Carousel><CarouselItem /><CarouselItem /><CarouselItem /></Carousel>)

        wrapper.setState({
            deltaX: -100,
            animate: true,
            currentIndex: 0,
            nextIndex: 1,
            prevIndex: 2
        })
        wrapper.instance().moveComplete()
        expect(wrapper.state('animate')).toBe(false)
        expect(wrapper.state('currentIndex')).toBe(1)
        expect(wrapper.state('nextIndex')).toBe(2)
        expect(wrapper.state('prevIndex')).toBe(0)
        expect(wrapper.state('deltaX')).toBe(0)
    })

    test('moveComplete reduces the indices if deltaX is positive', () => {
        const wrapper = mount(<Carousel><CarouselItem /><CarouselItem /><CarouselItem /></Carousel>)

        wrapper.setState({
            deltaX: 100,
            animate: true,
            currentIndex: 1,
            nextIndex: 2,
            prevIndex: 0
        })
        wrapper.instance().moveComplete()
        expect(wrapper.state('animate')).toBe(false)
        expect(wrapper.state('currentIndex')).toBe(0)
        expect(wrapper.state('nextIndex')).toBe(1)
        expect(wrapper.state('prevIndex')).toBe(2)
        expect(wrapper.state('deltaX')).toBe(0)
    })

    test('Setting the value of currentSlide also changes currentIndex to the same value', () => {
        const wrapper = mount(<Carousel currentSlide={0}><CarouselItem /><CarouselItem /><CarouselItem /></Carousel>)

        wrapper.setProps({currentSlide: 2})
        wrapper.setState({
            deltaX: -200,
        })
        wrapper.instance().moveComplete()
        expect(wrapper.state('currentIndex')).toBe(2)
    })

    test('moveComplete should call onSlideMove, passing it the the currentIndex', () => {
        const wrapper = mount(<Carousel currentSlide={0} onSlideMove={jest.fn()}><CarouselItem /><CarouselItem /><CarouselItem /></Carousel>)
        const targetSlide = 1

        wrapper.setProps({currentSlide: targetSlide})
        wrapper.setState({
            deltaX: -200,
        })
        expect(wrapper.prop('onSlideMove')).not.toBeCalled()
        wrapper.instance().moveComplete()
        expect(wrapper.prop('onSlideMove')).toBeCalledWith(targetSlide)
    })

    test('removes resize event listener on unmount', () => {
        const removeEventListener = window.removeEventListener
        window.removeEventListener = jest.fn()

        const wrapper = mount(<Carousel><CarouselItem /><CarouselItem /><CarouselItem /></Carousel>)
        expect(window.removeEventListener).not.toBeCalled()
        wrapper.unmount()
        expect(window.removeEventListener).toBeCalled()

        window.removeEventListener = removeEventListener
    })


    describe('touch support', () => {
        beforeAll(() => {
            window.ontouchstart = true
        })

        afterAll(() => {
            delete window.ontouchstart
        })

        test('onDownHandler reads the touch values rather than direct values', () => {
            const wrapper = mount(<Carousel><CarouselItem /></Carousel>)
            const mockEvent = {nativeEvent: {
                clientX: 50,
                clientY: 100,
                touches: [
                    {clientX: 200, clientY: 150}
                ]
            }}

            wrapper.instance().onDownHandler(mockEvent)
            expect(wrapper.state('dragStartX')).toBe(200)
        })

        test('touch handlers are rendered on the inner wrapper', () => {
            const wrapper = shallow(<Carousel><CarouselItem /></Carousel>)

            const innerWrapper = wrapper.find('.pw-carousel__inner')
            expect(innerWrapper.prop('onTouchStart')).toBeInstanceOf(Function)
            expect(innerWrapper.prop('onTouchMove')).toBeInstanceOf(Function)
            expect(innerWrapper.prop('onTouchEnd')).toBeInstanceOf(Function)

            expect(innerWrapper.prop('onMouseDown')).toBeUndefined()
            expect(innerWrapper.prop('onMouseMove')).toBeUndefined()
            expect(innerWrapper.prop('onMouseUp')).toBeUndefined()
        })
    })
})

describe('CarouselItem', () => {
    test('renders without errors', () => {
        const wrapper = mount(<CarouselItem />)

        expect(wrapper.length).toBe(1)
    })

    test('renders a link if an href is passed', () => {
        const wrapper = shallow(<CarouselItem href="http://google.com/">Test</CarouselItem>)

        expect(wrapper.type()).toBe(Link)
        expect(wrapper.prop('href')).toBe('http://google.com/')
    })

    test('renders a div if no href is passed', () => {
        const wrapper = shallow(<CarouselItem>Test</CarouselItem>)

        expect(wrapper.type()).toBe('div')
    })

    test('onClick and openInNewTab passed through to child link', () => {
        const clickHandler = () => {}
        const wrapper = shallow(<CarouselItem openInNewTab={true} onClick={clickHandler} href="http://google.com/">Test</CarouselItem>)

        expect(wrapper.prop('openInNewTab')).toBe(true)
        expect(wrapper.prop('onClick')).toBe(clickHandler)
    })

    test('onClick passed through to child div', () => {
        const clickHandler = () => {}
        const wrapper = shallow(<CarouselItem onClick={clickHandler}>Test</CarouselItem>)

        expect(wrapper.prop('onClick')).toBe(clickHandler)
    })

    test('includes the component class name with no className prop', () => {
        const wrapper = shallow(<CarouselItem />)

        expect(wrapper.hasClass('pw-carousel__item')).toBe(true)
    })

    test('does not render an \'undefined\' class with no className', () => {
        const wrapper = shallow(<CarouselItem />)

        expect(wrapper.hasClass('undefined')).toBe(false)
    })

    test('renders the contents of the className prop if present', () => {
        [
            'test',
            'test another'
        ].forEach((name) => {
            const wrapper = shallow(<CarouselItem className={name} />)

            expect(wrapper.hasClass(name)).toBe(true)
        })
    })
})
