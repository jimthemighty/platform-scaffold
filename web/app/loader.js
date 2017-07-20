/* global AJS_SLUG, NATIVE_WEBPACK_ASTRO_VERSION, MESSAGING_SITE_ID, MESSAGING_ENABLED, DEBUG */
import {getAssetUrl, getBuildOrigin, loadAsset, initCacheManifest} from 'progressive-web-sdk/dist/asset-utils'
import {
    documentWriteSupported,
    isFirefoxBrowser,
    isSamsungBrowser,
    loadScript,
    loadScriptAsPromise,
    preventDesktopSiteFromRendering
} from 'progressive-web-sdk/dist/utils/utils'
import {shouldPreview, loadPreview, isV8Tag} from 'progressive-web-sdk/dist/utils/preview-utils'
import {displayPreloader} from 'progressive-web-sdk/dist/preloader'
import cacheHashManifest from '../tmp/loader-cache-hash-manifest.json'
import {isRunningInAstro} from './utils/astro-integration'
import {
    createGlobalMessagingClientInitPromise,
    getMessagingSWVersion,
    loadAndInitMessagingClient,
    loaderLog,
    prefetchLink,
    setLoaderDebug
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

//  This needs to be based on whether this is a CDN environment, rather than
//  a preview environment. `web/service-worker-loader.js` will use this value
//  to determine whether it should load from a local development server, or
//  from the CDN.
const IS_LOCAL_PREVIEW = getBuildOrigin().indexOf('cdn.mobify.com') === -1

setLoaderDebug(DEBUG || IS_LOCAL_PREVIEW)

const isPWARoute = () => {
    return ReactRegexes.some((regex) => regex.test(window.location.pathname))
}

const isSupportedPWABrowser = () => {
    // By default, the PWA will run on all mobile browsers except Samsung and Firefox.
    const ua = window.navigator.userAgent
    return /ip(hone|od)|android.*(mobile)|blackberry.*applewebkit|bb1\d.*mobile/i.test(ua) &&
            !isSamsungBrowser(ua) &&
            !isFirefoxBrowser(ua)
}

const MINIMUM_NON_PWA_CHROME = 59   // todo!
/**
 * Returns true if the browser supports the nonPWA client. Note that
 * isSupportedPWABrowser and isSupportedNonPWABrowser *might* both
 * return true for a given browser; support is not mutually exclusive.
 * @returns {boolean}
 */
const isSupportedNonPWABrowser = () => {
    // By default, non-PWA mode will run on Chrome (above
    // minimum version numbers).
    // todo - firefox?
    if (!('serviceWorker' in navigator)) {
        return false
    }
    const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)
    return raw ? (parseInt(raw[2], 10) >= MINIMUM_NON_PWA_CHROME) : false
}

/**
 * Get the URL that should be used to load the service worker.
 * This is based on the SW_LOADER_PATH but may have additional
 * query parameters added that act as cachebreakers for the
 * Messaging part of the worker.
 *
 * @param pwaMode {Boolean} true to register the worker with a URL that
 * enables PWA mode, false if not.
 * @returns String
 */
const getServiceWorkerURL = (pwaMode) => {
    /**
     * This needs to be based on whether this is a CDN environment, rather than
     * a preview environment. `web/service-worker-loader.js` will use this value
     * to determine whether it should load from a local development server, or
     * from the CDN.
     * The PWA parameter is used by the worker to tell if it's loaded to support
     * a PWA (pwa=1) or not.
     */
    // The 'pwa=1' or 'pwa=0' parameter in this URL should not change format - the
    // worker does a regex test to match the exact string.
    const SW_LOADER_PATH = `/service-worker-loader.js?preview=${IS_LOCAL_PREVIEW}&b=${cacheHashManifest.buildDate}&pwa=${pwaMode ? 1 : 0}`

    const workerPathElements = [SW_LOADER_PATH]

    // In order to load the worker, we need to get the current Messaging
    // PWA service-worker version so that we can include it in the URL
    // (meaning that we will register a 'new' worker when that version
    // number changes).
    // The implementation here is designed to avoid adding an extra fetch
    // and slowing down the *first* run of the app. On the first run, we
    // will find nothing in localStorage, and return the URL without
    // any Messaging-worker parameters, but we'll do an asynchronous
    // fetch to update the parameters, which will then be used on the
    // next run. See getMessagingSWVersion for the exact semantics.
    if (messagingEnabled) {
        const swVersion = getMessagingSWVersion()
        if (swVersion) {
            workerPathElements.push(`msg_sw_version=${swVersion}`)
        }
    }

    // Return the service worker path
    return workerPathElements.join('&')
}

/**
 * Load the service worker.
 *
 * In nonPWA mode, this will be called on every page. This is safe;
 * to quote https://developers.google.com/web/fundamentals/getting-started/primers/service-workers:
 * "You can call register() every time a page loads without concern;
 * the browser will figure out if the service worker is already registered
 * or not and handle it accordingly".
 *
 * Note, though, that this assumes the URL returned by getServiceWorkerURL
 * doesn't change between pages. If it does, then the worker will be
 * re-registered with a different URL, causing it to restart.
 *
 * @param pwaMode {Boolean} true if the worker should be loaded in
 * PWA mode, false if not
 * @returns Promise.<Boolean> true when the worker is loaded and ready,
 * false if the worker fails to register, load or become ready.
 */
const loadWorker = (pwaMode) => {
    const url = getServiceWorkerURL(pwaMode)
    loaderLog(`Registering service worker ${url}`)

    // Note that we do not provide a scope to this call; we assume
    // the worker loader is served at the root of the site, so that
    // it controls the entire site.
    return navigator.serviceWorker.register(url)
        .then(() => navigator.serviceWorker.ready)
        .then(() => {
            loaderLog('Service worker is ready')
            return true
        })
        // We're intentionally swallowing errors here
        .catch(() => false)
}

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
 *
 * @param serviceWorkerSupported {Boolean} true if the service worker
 * has successfully loaded and is ready. False if there was a failure.
 * @param pwaMode {Boolean} passed to the Messaging client initialization.
 * @returns {Promise.<*>} that resolves when the client is loaded and
 * initialized, with the initial messaging state value (from
 * the Messaging client's init()). If messaging is not enabled,
 * returns a Promise that resolves to null (we don't reject because
 * that would lead to console warnings about uncaught rejections)
 */
const setupMessagingClient = (serviceWorkerSupported, pwaMode) => {
    if (serviceWorkerSupported && (!isRunningInAstro)) {
        // We need to create window.Mobify.WebPush.PWAClient
        // at this point. If a project is configured to use
        // non-progressive Messaging, it will load the
        // webpush-client-loader, which will then detect that
        // window.Mobify.WebPush.PWAClient exists and do nothing.
        window.Mobify = window.Mobify || {}
        window.Mobify.WebPush = window.Mobify.WebPush || {}
        window.Mobify.WebPush.PWAClient = {}

        if (messagingEnabled) {
            // We know we're not running in Astro, that the service worker is
            // supported and loaded, and messaging is enabled, so we can load
            // and initialize the Messaging client, returning the promise
            // from init().
            return loadAndInitMessagingClient(DEBUG, MESSAGING_SITE_ID, pwaMode)
        }
    }

    return Promise.resolve(null)
}

/**
 * A setTimeout wraps this trigger function in order to control the exact
 * timing that any tracking pixels are downloaded as the app initializes.
 * More specifically, downloading of any tracking pixels should not delay
 * the downloading of any other scripts (i.e. service workers, etc.)
 *
 * @param pwaMode {Boolean} true for PWA mode, false for nonPWA mode. This
 * affects the set of dimensions configured on the tracker, and whether
 * an initial timing point is collected (it's done in PWA mode only).
 *
 * @returns {Promise.<*>} resolved when setup is complete and any app
 * start events have been sent.
 */
const triggerAppStartEvent = (pwaMode) => {

    let resolver
    const resultPromise = new Promise((resolve) => {
        resolver = resolve
    })

    setTimeout(
        () => {
            Sandy.init(window)
            Sandy.create(AJS_SLUG, 'auto') // eslint-disable-line no-undef
            const tracker = Sandy.trackers[Sandy.DEFAULT_TRACKER_NAME]
            tracker.set('mobify_adapted', pwaMode)
            tracker.set('platform', pwaMode ? 'PWA' : 'nonPWA')

            if (pwaMode) {
                // Collect timing point for when app has started loading in order to
                // determine % dropoff of users who don't make it to the "pageview" event.
                const navigationStart = window.performance && performance.timing && performance.timing.navigationStart
                const mobifyStart = window.Mobify && Mobify.points && Mobify.points[0]
                const timingStart = navigationStart || mobifyStart
                if (timingStart) {
                    window.sandy('send', 'timing', 'timing', 'appStart', '', Date.now() - timingStart)
                }
            }

            // The act of running Sandy.init() blows away the binding of
            // window.sandy.instance in the pixel client. We are restoring it
            // here for now and will revisit this when we rewrite the Sandy
            // tracking pixel client
            window.sandy.instance = Sandy
            loaderLog('Sandy initialization done')
            resolver()
        }, 0
    )

    return resultPromise
}

let waitForBodyPromise
const waitForBody = () => {
    waitForBodyPromise = waitForBodyPromise || new Promise((resolve) => {
        const bodyEl = document.getElementsByTagName('body')

        const checkForBody = () => {
            if (bodyEl.length > 0) {
                resolve()
            } else {
                setTimeout(checkForBody, 50)
            }
        }

        checkForBody()
    })

    return waitForBodyPromise
}

/**
 * Initialize the app. Assumes that all needed polyfills have been
 * loaded.
 */
const attemptToInitializeApp = () => {
    window.Progressive = {
        AstroPromise: Promise.resolve({}),
        Messaging: {
            enabled: messagingEnabled
        }
    }

    initCacheManifest(cacheHashManifest)
    triggerAppStartEvent(true)

    /* eslint-disable max-len */
    loadAsset('meta', {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0'
    })
    /* eslint-enable max-len */

    loadAsset('meta', {
        name: 'theme-color',
        content: '#4e439b'
    })

    loadAsset('meta', {
        name: 'charset',
        content: 'utf-8'
    })

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

    // On poor connections, we don't want to load via document.write, otherwise
    // document.write will fail to work
    window.loadScriptsSynchronously = documentWriteSupported() && isV8Tag()

    // Force create the body element in order to render content. This is necessary
    // because we load scripts synchronously in order to speed up loading, which
    // by default would throw them in head, where as we need them in body.
    if (loadScriptsSynchronously) {
        document.write('<body>')
    }

    // Display the Preloader to indicate progress to the user (except when running
    // in an Astro app, hide the preloader because apps have their own splash screen).
    waitForBody().then(() => {
        if (!isRunningInAstro) {
            displayPreloader(preloadCSS, preloadHTML, preloadJS)
        }

        // Create React mounting target
        const body = document.getElementsByTagName('body')[0]
        const reactTarget = document.createElement('div')
        reactTarget.className = 'react-target'
        body.appendChild(reactTarget)
    })

    /**
     * This must be called before vendor.js is loaded (or before the Webpack
     * chunk that contains Messaging React components is loaded)
     *
     * This creates a Promise: `window.Progressive.MessagingClientInitPromise`
     * which will be resolved or rejected later by the method `setupMessagingClient`
     */
    createGlobalMessagingClientInitPromise(messagingEnabled)

    window.loadCriticalScripts = () => {
        // The following scripts are loaded async via document.write, in order
        // for the browser to increase the priority of these scripts. If the scripts
        // are loaded async, the browser will not consider them high priority and
        // queue them while waiting for other high priority resources to finish
        // loading. This delay can go all the way up to 5 seconds on a Moto G4 on a
        // 3G connection. More information can be found here:
        // https://developers.google.com/web/updates/2016/08/removing-document-write
        loadScript({
            id: 'progressive-web-vendor',
            src: getAssetUrl('vendor.js'),
            docwrite: window.loadScriptsSynchronously,
            isAsync: false,
            // If there is an error loading the script, then it must be a document.write issue,
            // so in that case, retry the loading asynchronously.
            onerror: function(){ console.warn('[Mobify.Progressive.Loader] document.write was blocked from loading 3rd party scripts. Loading scripts asynchronously instead.'); window.loadScriptsSynchronously = false; window.loadCriticalScripts() }
        })

        loadScript({
            id: 'progressive-web-main',
            src: getAssetUrl('main.js'),
            docwrite: window.loadScriptsSynchronously
        })

        loadScript({
            id: 'progressive-web-jquery',
            src: getAssetUrl('static/js/jquery.min.js'),
            docwrite: window.loadScriptsSynchronously
        })

        window.Progressive.capturedDocHTMLPromise = new Promise((resolve) => {
            // The reason we bound this to window is because the "onload" method below
            // is added to the document via document.write, this "onload" is toString'ed,
            // meaning it doesn't have accessed to closure variables.
            window.captureResolve = resolve
            loadScript({
                id: 'progressive-web-capture',
                src: CAPTURING_CDN,
                docwrite: window.loadScriptsSynchronously,
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
    }

    window.loadCriticalScripts()

    if (isRunningInAstro) {
        window.Progressive.AstroPromise = loadScriptAsPromise({
            id: 'progressive-web-app',
            src: ASTRO_CLIENT_CDN,
            rejectOnError: false
        }).then(() => window.Astro)

    }

    // Attempt to load the worker, in PWA mode
    (('serviceWorker' in navigator)
        ? loadWorker(true)
        : Promise.resolve(false)
    ).then((serviceWorkerSupported) => {
        // Start the process of fetching and initializing the
        // Messaging client, in PWA mode.
        setupMessagingClient(serviceWorkerSupported, true)
    })

    // Prefetch analytics - it's something that we will be downloading later,
    // and thus we want to fetch it so execution is not delayed to prevent
    // time to interactive from being delayed.
    prefetchLink({href: '//www.google-analytics.com/analytics.js'})

    // We insert a <plaintext> tag at the end of loading the scripts, in order
    // to ensure that the original site does not execute anything.
    // Do not remove!
    preventDesktopSiteFromRendering()
}

if (shouldPreview()) {
    // If preview is being used, load a completely different file from this one and do nothing.
    loadPreview()
} else {
    // Run the app.
    if (isSupportedPWABrowser() && isPWARoute()) {
        const neededPolyfills = getNeededPolyfills()
        let polyfillsToLoad = neededPolyfills.length
        if (polyfillsToLoad) {
            loaderLog(`Loading ${polyfillsToLoad} polyfills`)
            const callback = () => {
                if (--polyfillsToLoad <= 0) {
                    attemptToInitializeApp()
                }
            }
            neededPolyfills.forEach((polyfill) => polyfill.load(callback))
        } else {
            attemptToInitializeApp()
        }
    } else if (isSupportedNonPWABrowser()) {
        loaderLog('Starting setup for nonPWA mode')
        initCacheManifest(cacheHashManifest)

        // This a browser that supports our non-PWA mode, so we can assume that
        // service workers are supported. Load the worker in non-PWA mode, and
        // (in parallel) initialize analytics.
        // We assume that the browsers supporting nonPWA mode do not need any
        // polyfills. If any are needed, this would be the point to load them.
        Promise.all(
            // There are a number of steps that we can run simultaneously;
            // initializing the worker, initializing Analytics and waiting
            // for the <body> tag to exist.
            [
                loadWorker(false),
                triggerAppStartEvent(false),
                // We're loaded in a script located in <head> but we need to inject
                // scripts using `loadScript` which places them in <body> - so
                // we must wait until <body> exists.
                waitForBody()
            ]
        )
            .then((results) => {
                loaderLog('Completing setup for nonPWA mode')

                // This is called early so that the Promise is available
                // to any scripts that need to chain from it. It gets
                // resolved when setupMessagingClient completes.
                createGlobalMessagingClientInitPromise(messagingEnabled)

                // Set up the Messaging client integration (we do this after
                // analytics is set up, so that window.Sandy.instance is
                // available to Messaging). The serviceWorkerLoadedAndReady
                // result from loadWorker is available as results[0].
                // We ignore the Promise returned from this call, since
                // we want to continue to load and setup the non-pwa
                // script anyway, whether Messaging succeeds or not.
                setupMessagingClient(results[0], false)
                    .then((state) => loaderLog(`Messaging init complete with state ${JSON.stringify(state)}`))

                // This load will execute in parallel with setup of the
                // Messaging client.
                return loadScriptAsPromise({
                    id: 'mobify-non-pwa-script',
                    src: getAssetUrl('non-pwa.js'),
                    // We do nothing if the script fails
                    rejectOnError: true
                })
            })
            // we reach this point when the Messaging client has been
            // loaded and initialized, and the non-pwa.js script has
            // been loaded. We can now init the non-pwa script.
            .then(() => window.Mobify.NonPWA.init())

    } else {
        // If it's not a supported browser or there is no PWA view for this page,
        // still load a.js to record analytics.
        waitForBody().then(() => {
            loadScript(
                {
                    id: 'ajs',
                    src: `https://a.mobify.com/${AJS_SLUG}/a.js`
                })
        })
    }
}
