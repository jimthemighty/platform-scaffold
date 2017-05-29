/* eslint-env jest */
import AmpHtmlValidator from 'amphtml-validator'
import httpMocks from 'express-mocks-http'
import events from 'events'

import app from './main'

describe('Renders valid AMP', () => {

    const validateAmp = (renderedPage, resolve, reject) => {
        return AmpHtmlValidator.getInstance().then((validator) => {
            const result = validator.validateString(renderedPage)
            expect(result.status).toEqual('PASS')
            resolve()
        })
        .catch((error) => {
            reject(error)
        })
    }

    const makeResponse = () => {
        return httpMocks.createResponse({
            eventEmitter: events.eventEmitter
        })
    }

    test('Home', () => {
        return new Promise((resolve, reject) => {
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/'
            })
            const response = makeResponse()
            response.send = (renderedPage) => {
                return validateAmp(renderedPage, resolve, reject)
            }

            app.handle(request, response)
        })
    })

    test('PLP', () => {
        return new Promise((resolve, reject) => {
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/potions.html'
            })
            const response = makeResponse()
            response.send = (renderedPage) => {
                return validateAmp(renderedPage, resolve, reject)
            }

            app.handle(request, response)
        })
    })

    test('PDP', () => {
        return new Promise((resolve, reject) => {
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/eye-of-newt.html'
            })
            const response = makeResponse()
            response.send = (renderedPage) => {
                return validateAmp(renderedPage, resolve, reject)
            }

            app.handle(request, response)
        })
    })
})
