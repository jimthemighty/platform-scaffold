/* eslint-env jest */
import {shallow} from 'enzyme'
import React from 'react'

import {RawLogin as Login} from './container'

describe('The Login', () => {
    test('Should not render tabs at all if running in an Astro app', () => {
        const route = {
            route: 'register'
        }
        const login = shallow(<Login isRunningInAstro={false} route={route} />)
        expect(login.children().length).toBe(2)
    })

    test('Should not render tabs at all if running in an Astro app', () => {
        const route = {
            route: 'signin'
        }
        const login = shallow(<Login isRunningInAstro={true} route={route} />)
        expect(login.children().length).toBe(1)
    })
})