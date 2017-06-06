import sourceMapSupport from 'source-map-support'
sourceMapSupport.install()

import process from 'process'
import path from 'path'
import Promise from 'bluebird'
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import _jsdom from 'jsdom'
import {Provider} from 'react-redux'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import * as awsServerlessExpress from 'aws-serverless-express'
import ampPackageJson from '../package.json'

import thunk from 'redux-thunk'
import {fromJS} from 'immutable'
import CaptureDisable from './capturejs-disable'

import Analytics from './components/analytics'
import * as home from './containers/home/container'
import * as productDetails from './containers/product-details/container'
import * as productList from './containers/product-list/container'
import App from './containers/app/container'

import ampPage from './templates/amp-page'
import * as ampSDK from './amp-sdk'

import {reducer as imReducer} from '../../web/app/integration-manager/reducer'

const jsdom = Promise.promisifyAll(_jsdom)

// DO NOT USE! Merlins Connector is an example connector that is for demo only
import {Connector} from '../../web/app/integration-manager/_merlins-connector'
// import {Connector} from './integration-manager/_sfcc-connector'

import {registerConnector} from '../../web/app/integration-manager'

import {waitForResolves} from 'react-redux-resolve'

import {CURRENT_URL} from '../../web/app/containers/app/constants'
const PAGE_TITLE = 'pageTitle'

export const jsdomEnv = () => jsdom.envAsync('', ['http://code.jquery.com/jquery.js']) // TODO: Use local copy

const getFullUrl = (req) => {
    return `${ampPackageJson.siteUrl}${req.url}`
}

const initializeStore = (req) => {
    return jsdomEnv().then((window) => {
        const appReducer = require('../../web/app/containers/app/reducer').default
        const footerReducer = require('../../web/app/containers/footer/reducer').default
        const headerReducer = require('../../web/app/containers/header/reducer').default
        const navigationReducer = require('../../web/app/containers/navigation/reducer').default
        const productDetailsReducer = require('../../web/app/containers/product-details/reducer').default
        const productListReducer = require('../../web/app/containers/product-list/reducer').default

        const categoryReducer = require('../../web/app/store/categories/reducer').default
        const productReducer = require('../../web/app/store/products/reducer').default

        // This is okay to pass to both SFCC and Merlin's connectors,
        // as Merlin's doesn't need a configuration object
        registerConnector(Connector({
            siteID: '2017refresh',
            clientID: '5640cc6b-f5e9-466e-9134-9853e9f9db93'
        }))

        global.window = window
        global.Capture = {disable: (args) => { return CaptureDisable.apply(this, args) }}

        const uiReducer = combineReducers({
            app: appReducer,
            footer: footerReducer,
            header: headerReducer,
            navigation: navigationReducer,
            productDetails: productDetailsReducer,
            productList: productListReducer
        })

        const reducer = combineReducers({
            categories: categoryReducer,
            ui: uiReducer,
            products: productReducer,
            integrationManager: imReducer,
        })

        const middlewares = [
            thunk,
        ]

        const noop = (f) => f

        const initialState = ({ui: {app: fromJS({
            [CURRENT_URL]: getFullUrl(req),
            [PAGE_TITLE]: 'Merlins AMP' // Fetch the page again and get title?
        })}})

        const createdStore = createStore(reducer, initialState, compose(applyMiddleware(...middlewares), noop))
        const renderProps = {
            location: {},
            components: [AppComponent],
            history: {}
        }

        return waitForResolves(renderProps, createdStore)
        .then(() => {
            return createdStore
        })
    })
}


const render = (req, res, store, component, css) => {
    const scripts = new ampSDK.Set()

    const body = ReactDOMServer.renderToStaticMarkup(
        <ampSDK.AmpContext declareDependency={scripts.add}>
            <Provider store={store}>
                <App>
                    <Analytics templateName={component.templateName} projectSlug={ampPackageJson.cloudSlug} gaAccount={ampPackageJson.gaAccount} />
                    {React.createElement(component, {}, null)}
                </App>
            </Provider>
        </ampSDK.AmpContext>
    )
    const state = store.getState()
    const rendered = ampPage({
        title: state.ui.app.get(PAGE_TITLE),
        canonicalURL: getFullUrl(req),
        body,
        css,
        ampScriptIncludes: scripts.items().join('\n')
    })
    res.send(rendered)
}


const productDetailsPage = (req, res, next) => {
    initializeStore(req)
        .then((store) => render(req, res, store, productDetails.default, productDetails.styles))
        .catch(next)
}

const productListPage = (req, res, next) => {
    initializeStore(req)
        .then((store) => render(req, res, store, productList.default, productList.styles))
        .catch(next)
}

const homePage = (req, res, next) => {
    initializeStore(req)
        .then((store) => render(req, res, store, home.default, home.styles))
        .catch(next)
}

const app = express()

app.get('/', homePage)
app.get('/potions.html', productListPage)
app.get('/books.html', productListPage)
app.get('/ingredients.html', productListPage)
app.get('/supplies.html', productListPage)
app.get('/new-arrivals.html', productListPage)
app.get('/charms.html', productListPage)
app.get('/checkout/cart/configure/id/*/product_id/*/', productDetailsPage)
app.get('*.html', productDetailsPage)

app.use('/static', express.static(path.resolve('./app/static')))



const onLambda = process.env.hasOwnProperty('AWS_LAMBDA_FUNCTION_NAME')


if (!onLambda && require.main === module) {
    app.listen(3000, () => console.log('Example app listening on port 3000!'))
}


/**
 * Wrap the express app returning a handler function that can be used with AWS Lambda.
 */
const makeHandler = (expressApp) => {
    const binaryMimeTypes = [
      // If we choose to let express output gzipped responses, we'd need to add mimetypes here.
      // 'text/html',
    ]
    const server = awsServerlessExpress.createServer(expressApp, null, binaryMimeTypes)
    return (event, context) => awsServerlessExpress.proxy(server, event, context)
}


export const handler = onLambda ? makeHandler(app) : undefined

export default app
