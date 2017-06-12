/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// THIS SCRIPT MUST RUN IN THE PROJECT ROOT DIRECTORY
// The bin/get-routes.js script will make that happen.

/* eslint-env node */

'use strict'

global.document = require('jsdom').jsdom('<body></body>')
global.window = document.defaultView
global.window.matchMedia = global.window.matchMedia || function() {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {}
    }
}
global.navigator = window.navigator
const React = require('react')
const ReactDOM = require('react-dom')
const fs = require('fs')
const path = require('path')
const packageJson = require('./package.json')
const dependencies = packageJson.dependencies

const babelPlugins = ['transform-es2015-modules-commonjs']
if (dependencies['react-loadable']) {
    try {
        // If the project uses react-loadable, make sure it has babel-plugin-dynamic-import-node installed as well
        require('babel-plugin-dynamic-import-node') // eslint-disable-line import/no-extraneous-dependencies
        babelPlugins.push('dynamic-import-node')
    } catch (e) {
        throw new Error('Missing package.json dependency babel-plugin-dynamic-import-node. Run npm -i --save babel-plugin-dynamic-import-node')
    }
}
require('babel-register')({plugins: babelPlugins})

// This is required to ignore SVG asset loading
require('ignore-styles') // eslint-disable-line import/no-extraneous-dependencies

const writeRoutes = (routes) => {
    const routeJS = `/* eslint-disable */\n// GENERATED FILE DO NOT EDIT\nconst routes = [${routes}]\nexport default routes`

    fs.writeFileSync(path.join('app', 'loader-routes.js'), routeJS, 'utf8')
}

const appConfig = packageJson.config
if (appConfig.controlsAllPaths) {
    writeRoutes([/.*/]) // we just match on everything
    process.exit(0)
}

const Router = require('./app/router').default
/* eslint-disable import/no-extraneous-dependencies */
const getRouteList = require('progressive-web-sdk/dist/routing/is-react-route').getRouteList
/* eslint-enable import/no-extraneous-dependencies */

try {
    ReactDOM.render(React.createElement(Router, {}), document.body)
} catch (e) {
    console.error('An error has occurred while mounting the Router. Is the controlsAllPaths config value set correctly in package.json?')
    process.exit(1)
}

writeRoutes(getRouteList())
