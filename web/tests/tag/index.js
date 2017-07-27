/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* globals QUnit */
import * as TestUtils from './tag-test-utils'

const MOCK_LOADER = 'mock-loader.js'

QUnit.test('asynchronous loader loading', (assert) => {
    assert.expect(4)

    const html = TestUtils.replaceLoaderString(MOCK_LOADER)
    const iWindow = TestUtils.createFrame(html, {
        id: 'test-1',
        bodyContent: '<div id="body-content">Tag Test 1</div>',
        setMobileUA: false,
    })

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

QUnit.test('synchronous loader loading', (assert) => {
    assert.expect(3)

    const html = TestUtils.replaceLoaderString(MOCK_LOADER)
    const iWindow = TestUtils.createFrame(html, {
        id: 'test-2',
        setMobileUA: true
    })

    assert.deepEqual(iWindow.Mobify.optOut, false, 'window.Mobify.optOut is false')
    assert.deepEqual(iWindow.Mobify.shouldLoadPWA, true, 'window.Mobify.shouldLoadPWA is true')
    assert.deepEqual(
        iWindow.document.getElementById('mobify-v8-tag').async,
        false,
        'loader script element not added with async attribute'
    )
})
