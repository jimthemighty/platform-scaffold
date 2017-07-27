/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import tagHTML from '../../mobify-tag/v8.html'

/**
 * Replaces instances of the loader.js src string in the imported V8 tag HTML string
 * with the provided `replacement` string
 *
 * @param {string} replacement - The replacement for the loader.js src string
 * @returns {string} - the tag HTML with replaced loader.js src strings
 */
const LOADER_STRING_RE = new RegExp('https://cdn.mobify.com/sites/progressive-web-scaffold/production/loader.js', 'g')
export const replaceLoaderString = (replacement) => tagHTML.replace(LOADER_STRING_RE, replacement)

/**
 * Since the tag's behavior depends on `navigator.userAgent`, we need a way to
 * programmatically change it per test.
 * Thanks to @url: https://stackoverflow.com/a/26888312
 *
 * @param {object} win - the `window` object of the iframe
 * @param {string} userAgent - the userAgent string to set
 */
export const setUserAgent = (win, userAgent) => {
    const userAgentProp = {
        get() {
            return userAgent
        }
    }

    try {
        Object.defineProperty(win.navigator, 'userAgent', userAgentProp)
    } catch (e) {
        win.navigator = Object.create(navigator, {
            userAgent: userAgentProp
        })
    }
}

/**
 * Creates an iframe containing the provided `html`
 *
 * @param {string} html - the HTML to write to the iframe document
 * @param {object} options
 * @param {string} [options.bodyContent] - HTML to add inside <body> (default: '')
 * @param {number} [id] - #id to add to the <iframe> element created (default: incremented counter)
 * @param {boolean} [setMobileUA] - Whether to set the user agent to mobile (default: desktop)
 * @returns {object} the `window` object of the created iframe
 */
const START = '<!DOCTYPE html><html><head>'
const END = '</head><body><% bodyContent %></body></html>'
const MOBILE_UA = 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36'
const DESKTOP_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
let ifrCounter = 0

export const createFrame = (html, options) => {
    options = Object.assign({
        bodyContent: '',
        id: ifrCounter++,
        setMobileUA: true
    }, options)

    const body = document.getElementsByTagName('body')[0]
    const ifr = document.createElement('iframe')

    ifr.id = options.id
    ifr.style.display = 'none'

    const created = body.appendChild(ifr)
    const iWindow = created.contentWindow

    setUserAgent(iWindow, options.setMobileUA ? MOBILE_UA : DESKTOP_UA)

    iWindow.document.open()
    iWindow.document.write(START + html + END.replace(/<% bodyContent %>/, options.bodyContent))
    iWindow.document.close()

    return iWindow
}