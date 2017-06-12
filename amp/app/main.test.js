/* eslint-env jest */
import AmpHtmlValidator from 'amphtml-validator'
import httpMocks from 'node-mocks-http'
import events from 'events'
import fetch from 'node-fetch'

import app from './main'

describe('Renders valid AMP', () => {
    let validator

    beforeAll(() => {
        global.fetch = fetch
        return AmpHtmlValidator.getInstance().then((v) => { validator = v })
    })

    const validateAmp = (html) => {
        expect(validator.validateString(html).errors).toEqual([])
    }

    const handle = (req) => {
        return new Promise((resolve) => {
            const res = httpMocks.createResponse({
                eventEmitter: events.EventEmitter
            })

            res.on('end', () => resolve(res))
            res.on('send', () => resolve(res))

            app.handle(req, res)
        })
    }

    test('Home', () => {
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/'
        })
        return handle(req).then((res) => validateAmp(res._getData()))
    })

    test('ProductList', () => {
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/potions.html'
        })
        return handle(req).then((res) => validateAmp(res._getData()))
    })

    test('ProductDetails', () => {
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/eye-of-newt.html'
        })
        return handle(req).then((res) => validateAmp(res._getData()))
    })
})
