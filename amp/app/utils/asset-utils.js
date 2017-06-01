/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// Helper method to get the directory name of the given script element's src
// attribute. We expect only external script elements to be provided as argument
// and with an absolute src path
export const getScriptOrigin = (scriptEl) => {
    const src = scriptEl && scriptEl.getAttribute('src')

    // This regular expression replaces the last found '/' and anything following
    // with a '/', i.e.:
    // 'http://www.mobify.com/hello-world.js' -> 'http://www.mobify.com/'
    const match = src && src.replace(/\/[^/]*$/, '/')

    if (!match) {
        console.error('Couldn\'t determine build file used. The mobify-tag may be placed incorrectly.') // eslint-disable-line max-len
    }

    return match
}

/**
 *  Grabs the location of the build so we can reference assets
 *  with absolute urls
 */
export const getBuildOrigin = () => {
    const defaultBuildOrigin = '//0.0.0.0:3000/'

    // Progressive web projects inject build script with the given ID
    let cachedBuildScript = document.getElementById('progressive-web-script')

    // If script with given ID is not found, look for the loader script
    if (!cachedBuildScript) {
        const scripts = document.getElementsByTagName('script')
        for (let i = 0; i < scripts.length; i++) {
            if (/(loader|adaptive)(\.min)?\.js/.test(scripts[i].getAttribute('src'))) {
                cachedBuildScript = scripts[i]
                break
            }
        }
    }

    return getScriptOrigin(cachedBuildScript) || defaultBuildOrigin
}

// Expected to be overridden by initCacheManifest
let cacheHashManifest = {
    hashes: {},
    buildDate: Date.now()
}

/**
 * Expects object of the form shown above by cacheHashManifest
 * provided by scripts/create-hash-manifest.js run in a project
 */
export const initCacheManifest = (externalManifest) => {
    cacheHashManifest = externalManifest
}

/**
 *  Returns the full url for the provided asset path
 *  including a cache breaker.
 *  basePath and cacheBreaker arguments are optional
 */
export const getAssetUrl = (path, baseUrl, cacheBreaker) => {
    if (cacheBreaker === undefined) {
        const hash = cacheHashManifest.hashes[path]

        cacheBreaker = hash || cacheHashManifest.buildDate
    }

    return `${baseUrl || getBuildOrigin()}${path}?${cacheBreaker}`
}

/**
 *  Dynamically adds an element to the page based on the nodeName
 *  and options supplied
 *
 *  ex: loadAsset('link', {
 *          href: 'css/stylesheet.css',
 *          rel: 'stylesheet',
 *          type: 'text/css'
 *      })
 */
export const loadAsset = (nodeName, options) => {
    const firstScript = document.getElementsByTagName('script')[0]

    const script = document.createElement(nodeName)
    Object.keys(options).forEach((prop) => {
        script.setAttribute(prop, options[prop])
    })
    firstScript.parentNode.insertBefore(script, firstScript)
}
