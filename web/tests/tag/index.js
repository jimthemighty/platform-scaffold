/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* globals QUnit */
import * as TestUtils from './tag-test-utils'

const MOCK_LOADER = 'mock-loader.js'

QUnit.testStart(() => {
    TestUtils.resetMobifyPathCookie()
})

QUnit.test('loader is added with async attribute when shouldLoadPWA is false', (assert) => {
    const done = assert.async()
    assert.expect(4)

    TestUtils.createFrame({
        id: 'async-test',
        bodyContent: '<div id="body-content">Tag Test 1</div>',
        setMobileUA: false, // this will cause async loading
        replaceLoader: MOCK_LOADER
    })
    .then((iWindow) => {
        assert.equal(
            iWindow.document.getElementById('body-content').textContent,
            'Tag Test 1',
            'div#body-content was not removed after Tag ran'
        )

        assert.deepEqual(iWindow.Mobify.optOut, false, 'window.Mobify.optOut is false')
        assert.deepEqual(iWindow.Mobify.shouldLoadPWA, false, 'window.Mobify.shouldLoadPWA is false')
        assert.deepEqual(
            iWindow.document.getElementById('mobify-v8-tag').async,
            true,
            'loader script element added with async attribute'
        )
    })
    .then(done)
})

QUnit.test('loader is added as a synchronous script, when shouldLoadPWA is true', (assert) => {
    const done = assert.async()
    assert.expect(3)

    TestUtils.createFrame({
        id: 'sync-test',
        setMobileUA: true, // this will cause sync loading
        replaceLoader: MOCK_LOADER
    })
    .then((iWindow) => {
        assert.deepEqual(iWindow.Mobify.optOut, false, 'window.Mobify.optOut is false')
        assert.deepEqual(iWindow.Mobify.shouldLoadPWA, true, 'window.Mobify.shouldLoadPWA is true')
        assert.deepEqual(
            iWindow.document.getElementById('mobify-v8-tag').async,
            false,
            'loader script element not added with async attribute'
        )
    })
    .then(done)
})

QUnit.test('if optOut is true, loader is not added to document', (assert) => {
    const done = assert.async()
    assert.expect(2)

    TestUtils.createFrame({
        id: 'opt-out-test',
        setMobileUA: true, // this will cause sync loading
        replaceLoader: MOCK_LOADER,
        beforeWrite: (win) => {
            win.document.cookie = 'mobify-path=;'
        }
    })
    .then((iWindow) => {
        assert.deepEqual(iWindow.Mobify.optOut, true, 'window.Mobify.optOut is true')
        assert.deepEqual(
            iWindow.document.getElementById('mobify-v8-tag'),
            null,
            'loader script element not added to document'
        )
    })
    .then(done)
})

QUnit.test('disableTag is run when a sync script loading error is encountered', (assert) => {
    const done = assert.async()
    assert.expect(2)

    TestUtils.createFrame({
        id: 'disable-tag-sync',
        setMobileUA: true, // this will cause sync loading
        replaceLoader: '404-asset.js' // asset doesn't exist - should cause error
    })
    .then((win) => {
        assert.deepEqual(win.Mobify.shouldLoadPWA, true, 'window.Mobify.shouldLoadPWA is true')
        assert.deepEqual(
            /mobify-path=(;|$)/.test(document.cookie),
            true,
            'document.cookie was set to blank mobify-path after script failure'
        )
    })
    .then(done)
})

QUnit.test('disableTag is run when an async script loading error is encountered', (assert) => {
    const done = assert.async()
    assert.expect(3)

    TestUtils.createFrame({
        id: 'disable-tag-async',
        setMobileUA: false, // this will cause async loading
        replaceLoader: '404-asset.js' // asset doesn't exist - should cause error
    })
    .then((iWindow) => {
        assert.deepEqual(iWindow.Mobify.shouldLoadPWA, false, 'window.Mobify.shouldLoadPWA is false')
        assert.deepEqual(
            iWindow.document.getElementById('mobify-v8-tag').async,
            true,
            'loader script element added with async attribute'
        )
        assert.deepEqual(
            /mobify-path=(;|$)/.test(document.cookie),
            true,
            'document.cookie was set to blank mobify-path after script failure'
        )
    })
    .then(done)
})
