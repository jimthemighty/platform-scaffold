import sourceMapSupport from 'source-map-support'
sourceMapSupport.install()

import ReactInjection from 'react-dom/lib/ReactInjection'

// Whitelist the 'on' attribute, frequently used with AMP. This must be done once,
// before any rendering happens.
ReactInjection.DOMProperty.injectDOMPropertyConfig({
    isCustomAttribute: (attributeName) => (
        ['on'].indexOf(attributeName) >= 0
    )
})

import process from 'process'
import path from 'path'
import Promise from 'bluebird'
import fetch from 'node-fetch'
import express from 'express'
import morgan from 'morgan'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import _jsdom from 'jsdom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import * as awsServerlessExpress from 'aws-serverless-express'
import ampPackageJson from '../package.json'

import Analytics from './components/analytics'
import * as home from './containers/home/container'
import * as productDetails from './containers/product-details/container'
import * as productList from './containers/product-list/container'
import App from './containers/app/container'

import ampPage from './templates/amp-page'
import * as ampSDK from './amp-sdk'



const jsdom = Promise.promisifyAll(_jsdom)


const base = 'https://www.merlinspotions.com'

export const jsdomEnv = () => jsdom.envAsync('', ['http://code.jquery.com/jquery.js'])

export const parse = (window, html) => {
    const $ = window.$
    const $html = $(html)
    return {
        links: $.map($html.find('a'), (el) => $(el).text()),
        title: $html.find('h1').text()
    }
}


/**
 * This could be either an HTML-scraper or an integration manager call.
 */
const initializeStore = (req) => {
    const noopReducer = (state) => state
    return Promise.all([jsdomEnv(), fetch(base + req.url).then((res) => res.text())])
    .then(([window, html]) => parse(window, html))
    .then((initialData) => createStore(noopReducer, initialData))
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
        title: state.title,
        canonicalURL: req.url,
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

const onLambda = process.env.hasOwnProperty('AWS_LAMBDA_FUNCTION_NAME')

const app = express()

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(onLambda ? 'short' : 'dev'))
}

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


if (!onLambda && require.main === module) {
    const port = 3000
    app.listen(port, () => console.log(`AMP server listening on port ${port}!`))
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
