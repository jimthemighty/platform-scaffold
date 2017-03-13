import {getAssetUrl, loadAsset, initCacheManifest} from 'progressive-web-sdk/dist/asset-utils'
import {displayPreloader} from 'progressive-web-sdk/dist/preloader'
import cacheHashManifest from '../tmp/loader-cache-hash-manifest.json'
import {isRunningInAstro} from './utils/astro-integration'

window.Progressive = {}

import ReactRegexes from './loader-routes'

const isReactRoute = () => {
    return ReactRegexes.some((regex) => regex.test(window.location.pathname))
}

initCacheManifest(cacheHashManifest)

// This isn't accurate but does describe the case where the PR currently works
const IS_PREVIEW = /mobify-path=true/.test(document.cookie)

const CAPTURING_CDN = '//cdn.mobify.com/capturejs/capture-latest.min.js'
const SW_LOADER_PATH = `/service-worker-loader.js?preview=${IS_PREVIEW}&b=${cacheHashManifest.buildDate}`

import preloadHTML from 'raw-loader!./preloader/preload.html'
import preloadCSS from 'css-loader?minimize!./preloader/preload.css'
import preloadJS from 'raw-loader!./preloader/preload.js' // eslint-disable-line import/default

const loadWorker = () => (
      navigator.serviceWorker.register(SW_LOADER_PATH)
        .then(() => navigator.serviceWorker.ready)
        .catch(() => {})
)

// webpackJsonpAsync is a custom async webpack code splitting chunk wrapper
// webpackJsonp is a webpack code splitting vendor wrapper
// webpackJsonpAsync should wait and call webpackJsonp with payload when all dependencies are loaded
const asyncInitApp = () => {
    window.webpackJsonpAsync = (module, exports, webpackRequire) => {
        const runJsonpAsync = function() {
            return (window.webpackJsonp)
                ? window.webpackJsonp(module, exports, webpackRequire)
                : setTimeout(runJsonpAsync, 50)
        }

        runJsonpAsync()
    }
}

if (isReactRoute()) {
    displayPreloader(preloadCSS, preloadHTML, preloadJS)

    // Create React mounting target
    const body = document.getElementsByTagName('body')[0]
    const reactTarget = document.createElement('div')
    reactTarget.className = 'react-target'
    body.appendChild(reactTarget)

    const makeScriptPromise = ({id, src, onload}) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')

            // Setting UTF-8 as our encoding ensures that certain strings (i.e.
            // Japanese text) are not improperly converted to something else. We
            // do this on the vendor scripts also just in case any libs we
            // import have localized strings in them.
            script.charset = 'utf-8'
            script.async = true
            script.id = id
            script.src = src
            script.onload = typeof onload === typeof function() {}
                ? () => onload(resolve)
                : resolve
            script.onerror = resolve

            body.appendChild(script)
        })
    }

    /* eslint-disable max-len */
    loadAsset('meta', {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
    })
    /* eslint-enable max-len */

    loadAsset('meta', {
        name: 'theme-color',
        content: '#4e439b'
    });

    // load the worker if available
    // if no worker is available, we have to assume that promises might not be either.
    // Astro doesn't currently support service workers
    (('serviceWorker' in navigator && !isRunningInAstro)
     ? loadWorker()
     : {then: (fn) => setTimeout(fn)}
    ).then(() => {
        loadAsset('link', {
            href: getAssetUrl('main.css'),
            rel: 'stylesheet',
            type: 'text/css',
            // Tell us when the stylesheet has loaded so we know when it's safe to
            // display the app! This prevents a flash of unstyled content.
            onload: 'window.Progressive.stylesheetLoaded = true;'
        })

        loadAsset('link', {
            href: getAssetUrl('static/manifest.json'),
            rel: 'manifest'
        })

        const jQueryPromise = makeScriptPromise({
            id: 'progressive-web-jquery',
            src: getAssetUrl('static/js/jquery.min.js')
        })

        const capturingPromise = makeScriptPromise({
            id: 'progressive-web-capture',
            src: CAPTURING_CDN,
            onload: (resolveOnload) => {
                window.Capture.init((capture) => {
                    // NOTE: by this time, the captured doc has changed a little
                    // bit from original desktop. It now has some of our own
                    // assets (e.g. main.css) but they can be safely ignored.
                    window.Progressive.initialCapturedDocHTML = new Promise((resolveCapture) => {
                        resolveCapture(capture.enabledHTMLString())
                    })
                    resolveOnload()
                })
            }
        })

        const mainPromise = makeScriptPromise({
            id: 'progressive-web-main',
            src: getAssetUrl('main.js')
        })

        const vendorPromise = makeScriptPromise({
            id: 'progressive-web-vendor',
            src: getAssetUrl('vendor.js')
        })

        // Load all dependencies asynchronously
        asyncInitApp()
        Promise.all([
            jQueryPromise,
            capturingPromise,
            mainPromise,
            vendorPromise
        ])
    })
} else {
    const capturing = document.createElement('script')
    capturing.async = true
    capturing.id = 'progressive-web-capture'
    capturing.src = CAPTURING_CDN
    document.body.appendChild(capturing)

    const interval = setInterval(() => {
        if (window.Capture) {
            clearInterval(interval)
            window.Capture.init((capture) => {
                capture.restore()
            })
        }
    }, 150)
}
