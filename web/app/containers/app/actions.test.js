/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */

import Immutable, {fromJS} from 'immutable'
import {setPageFetchError, clearPageFetchError} from 'progressive-web-sdk/dist/store/offline/actions'
import {OFFLINE_MODAL} from '../../modals/constants'
import {OFFLINE_ASSET_URL} from './constants'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
jest.mock('../../modals/actions')
import {closeModal} from '../../modals/actions'
import {checkIfOffline} from './actions'


let realFetch
beforeAll(() => {
    realFetch = global.fetch
    global.fetch = jest.fn()
    global.fetch.mockReturnValue(Promise.resolve())

})

afterAll(() => {
    global.fetch = realFetch
})

test('checkIfOffline dispatches setPageFetchError if network request fails', () => {
    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.reject(new TypeError('failed to fetch')))

    const fakeDispatch = jest.fn()
    const fakeGetState = () => ({
        offline: Immutable.Map()
    })
    const thunk = checkIfOffline()

    return thunk(fakeDispatch, fakeGetState)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toMatch(OFFLINE_ASSET_URL)

            expect(fakeDispatch).toBeCalled()
            expect(fakeDispatch.mock.calls[0][0]).toEqual(setPageFetchError('failed to fetch'))
        })
})

test('checkIfOffline dispatches setPageFetchError if it receives modified JSON from worker', () => {
    const mockResponse = {
        obj: {
            offline: true
        },
        json() {
            return this.obj
        }
    }

    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.resolve(mockResponse))

    const fakeDispatch = jest.fn()
    const fakeGetState = () => ({
        modals: undefined,
        offline: Immutable.Map()
    })
    const thunk = checkIfOffline()

    return thunk(fakeDispatch, fakeGetState)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toMatch(OFFLINE_ASSET_URL)

            expect(fakeDispatch).toHaveBeenCalledTimes(3)
            expect(fakeDispatch.mock.calls[0][0]).toEqual(setPageFetchError('Network failure, using worker cache'))
        })
})

test('checkIfOffline clears offline modal and page fetch errors when it receives untouched JSON from network', () => {
    const mockResponse = {
        obj: {},
        json() {
            return this.obj
        }
    }

    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.resolve(mockResponse))

    const fakeDispatch = jest.fn()
    const fakeGetState = () => ({
        modals: fromJS({
            [OFFLINE_MODAL]: true
        }),
        offline: Immutable.Map()
    })
    // closeModal = jest.fn()  // eslint-disable-line
    const thunk = checkIfOffline()

    return thunk(fakeDispatch, fakeGetState)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toMatch(OFFLINE_ASSET_URL)

            expect(fakeDispatch).toHaveBeenCalledTimes(2)
            expect(fakeDispatch.mock.calls[0][0]).toEqual(clearPageFetchError())
            expect(closeModal).toHaveBeenCalledWith(OFFLINE_MODAL, UI_NAME.offline)
        })
})
