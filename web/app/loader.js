/* global NATIVE_WEBPACK_ASTRO_VERSION, MESSAGING_SITE_ID, MESSAGING_ENABLED, DEBUG */
import {getAssetUrl, getBuildOrigin, loadAsset, initCacheManifest} from 'progressive-web-sdk/dist/asset-utils'
import {
    isSamsungBrowser,
    isFirefoxBrowser,
    preventDesktopSiteFromRendering,
    loadScript,
    loadScriptAsPromise
} from 'progressive-web-sdk/dist/utils/utils'
import {shouldPreview, loadPreview} from 'progressive-web-sdk/dist/utils/preview-utils'
import {displayPreloader} from 'progressive-web-sdk/dist/preloader'
import cacheHashManifest from '../tmp/loader-cache-hash-manifest.json'
import {isRunningInAstro} from './utils/astro-integration'
import {
    getMessagingSWVersion,
    isLocalStorageAvailable,
    loadAndInitMessagingClient,
    updateMessagingSWVersion
} from './utils/loader-utils'
import {getNeededPolyfills} from './utils/polyfills'
import ReactRegexes from './loader-routes'
import Sandy from 'sandy-tracking-pixel-client/src/index'

import preloadHTML from 'raw-loader!./preloader/preload.html'
import preloadCSS from 'css-loader?minimize!./preloader/preload.css'
import preloadJS from 'raw-loader!./preloader/preload.js' // eslint-disable-line import/default

window.Progressive = {}

const ASTRO_VERSION = NATIVE_WEBPACK_ASTRO_VERSION // replaced at build time
const messagingEnabled = MESSAGING_ENABLED  // replaced at build time

const CAPTURING_CDN = '//cdn.mobify.com/capturejs/capture-latest.min.js'
const ASTRO_CLIENT_CDN = `//assets.mobify.com/astro/astro-client-${ASTRO_VERSION}.min.js`

const isPWARoute = () => {
    return ReactRegexes.some((regex) => regex.test(window.location.pathname))
}

const isSupportedBrowser = () => {
    // By default, the PWA will run on all mobile browsers except Samsung and Firefox.
    const ua = window.navigator.userAgent
    return /ip(hone|od)|android.*(mobile)|blackberry.*applewebkit|bb1\d.*mobile/i.test(ua) &&
            !isSamsungBrowser(ua) &&
            !isFirefoxBrowser(ua)
}

/**
 * Get the URL that should be used to load the service worker.
 * This is based on the SW_LOADER_PATH but may have additional
 * query parameters added that act as cachebreakers for the
 * Messaging part of the worker.
 * @returns String
 */
const getServiceWorkerURL = () => {
    const IS_LOCAL_PREVIEW = getBuildOrigin().indexOf('cdn.mobify.com') === -1
    /**
     * This needs to be based on whether this is a CDN environment, rather than
     * a preview environment. `web/service-worker-loader.js` will use this value
     * to determine whether it should load from a local development server, or
     * from the CDN.
     */
    const SW_LOADER_PATH = `/service-worker-loader.js?preview=${IS_LOCAL_PREVIEW}&b=${cacheHashManifest.buildDate}`

    // In order to load the worker, we need to get the current Messaging
    // PWA service-worker version so that we can include it in the URL
    // (meaning that we will register a 'new' worker when that version
    // number changes).
    // The implementation here is designed to avoid adding an extra fetch
    // and slowing down the *first* run of the app. On the first run, we
    // will find nothing in localStorage, and return the URL without
    // any Messaging-worker parameters, but we'll do an asynchronous
    // fetch to update the parameters, which will then be used on the
    // next run.

    // We expect supported browsers to have local storage. If the browser
    // does not, then we may assume we're running in some situation
    // like incognito mode, in which case there is no point getting
    // Messaging worker version data, we can just use the base URL.
    if (!isLocalStorageAvailable()) {
        return SW_LOADER_PATH
    }

    const workerPathElements = [SW_LOADER_PATH]

    const swVersion = getMessagingSWVersion()
    if (swVersion) {
        workerPathElements.push(`msg_sw_version=${swVersion}`)
    }

    // Return the service worker path
    return workerPathElements.join('&')
}

/**
 * Load the service worker
 * @returns Promise.<Boolean> true when the worker is loaded and ready
 */
const loadWorker = () => (
    navigator.serviceWorker.register(getServiceWorkerURL())
        .then(() => navigator.serviceWorker.ready)
        .then(() => true)
        .catch(() => {
        })
)

const asyncInitApp = () => {
    window.webpackJsonpAsync = (module, exports, webpackRequire) => {
        const runJsonpAsync = () => {
            if (window.webpackJsonp) {
                // Run app
                window.webpackJsonp(module, exports, webpackRequire)
            } else {
                setTimeout(runJsonpAsync, 50)
            }
        }

        runJsonpAsync()
    }
}

/**
 * Do the preloading preparation for the Messaging client.
 * This includes any work that does not require a network fetch or
 * otherwise slow down initialization.
 *
 * If messagingEnabled is not truthy, then we don't load the
 * Messaging PWA client. The Messaging service worker code is
 * still included, but won't be configured and will do nothing.
 */
const setupMessagingClient = (serviceWorkerSupported) => {
    if ((!serviceWorkerSupported) || isRunningInAstro) {
        return
    }
    // We need to create window.Mobify.WebPush.PWAClient
    // at this point. If a project is configured to use
    // non-progressive Messaging, it will load the
    // webpush-client-loader, which will then detect that
    // window.Mobify.WebPush.PWAClient exists and do nothing.
    window.Mobify = window.Mobify || {}
    window.Mobify.WebPush = window.Mobify.WebPush || {}
    window.Mobify.WebPush.PWAClient = {}

    // Update the Messaging worker version data.
    updateMessagingSWVersion()

    if (messagingEnabled) {
        // We know we're not running in Astro, that the service worker is
        // supported and loaded, and messaging is enabled, so we can load
        // and initialize the Messaging client.
        loadAndInitMessagingClient(DEBUG, MESSAGING_SITE_ID)
    }
}

const triggerAppStartEvent = () => {
    // Collect timing put for when app has started loading in order to
    // determine % dropoff of users who don't make it to the "pageview" event.
    Sandy.init(window)
    Sandy.create(AJS_SLUG, 'auto') // eslint-disable-line no-undef
    const tracker = Sandy.trackers[Sandy.DEFAULT_TRACKER_NAME]
    tracker.set('mobify_adapted', true)
    tracker.set('platform', 'PWA')
    const navigationStart = window.performance && performance.timing && performance.timing.navigationStart
    const mobifyStart = window.Mobify && Mobify.points && Mobify.points[0]
    const timingStart = navigationStart || mobifyStart
    if (timingStart) {
        window.sandy('send', 'timing', 'timing', 'appStart', '', Date.now() - timingStart)
    }

    // The act of running Sandy.init() blows away the binding of window.sandy.instance in the pixel client
    // We are restoring it here for now and will revisit this when we rewrite sandy tracking pixel client
    window.sandy.instance = Sandy
}

const attemptToInitializeApp = () => {
    if (getNeededPolyfills().length) {
        return
    }

    window.Progressive = {
        AstroPromise: Promise.resolve({}),
        Messaging: {
            enabled: messagingEnabled
        }
    }

    initCacheManifest(cacheHashManifest)
    triggerAppStartEvent()

    // Force create the body element in order to render content. This is necessary
    // because we load scripts synchronously in order to speed up loading, which
    // by default would throw them in head, where as we need them in body.
    document.write('<body>')

    // When the PWA is running in an Astro app, hide the preloader because apps
    // have their own splash screen.
    if (!isRunningInAstro) {
        displayPreloader(preloadCSS, preloadHTML, preloadJS)
    }

    // Create React mounting target
    const body = document.getElementsByTagName('body')[0]
    const reactTarget = document.createElement('div')
    reactTarget.className = 'react-target'
    body.appendChild(reactTarget)

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

    loadAsset('meta', {
        name: 'charset',
        content: 'utf-8'
    });

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

    asyncInitApp()

    const loadScriptsSynchronously = true // TODO: this should be false when network is 2G.

    // The following scripts are loaded async via document.write, in order
    // for the browser to increase the priority of these scripts. If the scripts
    // are loaded async, the browser will not consider them high priority and
    // queue them while waiting for other high priority resources to finish
    // loading. This delay can go all the way up to 5 seconds on a Moto G4 on a
    // 3G connection.
    loadScript({
        id: 'progressive-web-vendor',
        src: getAssetUrl('vendor.js'),
        docwrite: loadScriptsSynchronously,
        isAsync: false
    })

    loadScript({
        id: 'progressive-web-main',
        src: getAssetUrl('main.js'),
        docwrite: loadScriptsSynchronously
    })

    loadScript({
        id: 'progressive-web-jquery',
        src: getAssetUrl('static/js/jquery.min.js'),
        docwrite: loadScriptsSynchronously
    })

    window.Progressive.capturedDocHTMLPromise = new Promise((resolve) => {
        // The reason we bound this to window is because the "onload" method below
        // is added to the document via document.write, this "onload" is toString'ed,
        // meaning it doesn't have accessed to closure variables.
        window.captureResolve = resolve
        loadScript({
            id: 'progressive-web-capture',
            src: CAPTURING_CDN,
            docwrite: loadScriptsSynchronously,
            onload: () => {
                window.Capture.init((capture) => {
                    // NOTE: by this time, the captured doc has changed a little
                    // bit from original desktop. It now has some of our own
                    // assets (e.g. main.css) but they can be safely ignored.
                    window.captureResolve(capture.enabledHTMLString())
                })
            }
        })
    })

    if (isRunningInAstro) {
        window.Progressive.AstroPromise = loadScriptAsPromise({
            id: 'progressive-web-app',
            src: ASTRO_CLIENT_CDN,
            rejectOnError: false
        }).then(() => window.Astro)

    }

    // Attempt to load the worker.
    (('serviceWorker' in navigator)
        ? loadWorker()
        : Promise.resolve(false)
    ).then((serviceWorkerSupported) => {

        // Set up the Messaging client integration
        setupMessagingClient(serviceWorkerSupported)
    })

    // We insert a <plaintext> tag at the end of loading the scripts, in order
    // to ensure that the original site does not execute anything.
    preventDesktopSiteFromRendering()
}

// Apply polyfills
const neededPolyfills = getNeededPolyfills()

if (shouldPreview()) {
    // If preview is being used, load a completely different file from this one and do nothing.
    loadPreview()
} else {
    // Run the app.
    if (isSupportedBrowser() && isPWARoute()) {
        if (neededPolyfills.length) {
            neededPolyfills.forEach((polyfill) => polyfill.load(attemptToInitializeApp))
        } else {
            attemptToInitializeApp()
        }
    } else {
        // If it's not a supported browser or there is no PWA view for this page,
        // still load a.js to record analytics.
        loadScript({
            id: 'ajs',
            src: `https://a.mobify.com/${AJS_SLUG}/a.js`
        })
    }
}

