/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* globals QUnit */
import * as TestUtils from './tag-test-utils'

const MOCK_LOADER = 'mock-loader.js'

QUnit.test('loader is added with async attribute when shouldLoadPWA is false', (assert) => {
    assert.expect(4)

    const iWindow = TestUtils.createFrame({
        id: 'test-1',
        bodyContent: '<div id="body-content">Tag Test 1</div>',
        setMobileUA: false,
        replaceLoader: MOCK_LOADER
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

QUnit.test('loader is added as a synchronous script, when shouldLoadPWA is true', (assert) => {
    assert.expect(3)

    const iWindow = TestUtils.createFrame({
        id: 'test-2',
        setMobileUA: true,
        replaceLoader: MOCK_LOADER
    })

    assert.deepEqual(iWindow.Mobify.optOut, false, 'window.Mobify.optOut is false')
    assert.deepEqual(iWindow.Mobify.shouldLoadPWA, true, 'window.Mobify.shouldLoadPWA is true')
    assert.deepEqual(
        iWindow.document.getElementById('mobify-v8-tag').async,
        false,
        'loader script element not added with async attribute'
    )
})

QUnit.test('if optOut is true, loader is not added to document', (assert) => {
    assert.expect(2)

    const iWindow = TestUtils.createFrame({
        id: 'test-3',
        setMobileUA: true,
        replaceLoader: MOCK_LOADER,
        beforeWrite: () => {
            document.cookie = 'mobify-path=;'
        }
    })

    assert.deepEqual(iWindow.Mobify.optOut, true, 'window.Mobify.optOut is true')
    assert.deepEqual(
        iWindow.document.getElementById('mobify-v8-tag'),
        null,
        'loader script element not added to document'
    )
})
