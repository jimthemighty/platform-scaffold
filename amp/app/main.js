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
import * as awsServerlessExpress from 'aws-serverless-express'
import ampPackageJson from '../package.json'

import Analytics from './components/analytics'
import * as home from './containers/home/container'
import * as productDetails from './containers/product-details/container'
import * as productList from './containers/product-list/container'
import App from './containers/app/container'

import ampPage from './templates/amp-page'
import * as ampSDK from './amp-sdk'

import {createConnectedStore} from './data-integration/connectedStore'
import {PAGE_TITLE} from './data-integration/constants'

import {initHomePage} from '../../web/app/integration-manager/home/commands'
import {initProductDetailsPage} from '../../web/app/integration-manager/products/commands'
import {initProductListPage} from '../../web/app/integration-manager/categories/commands'

const jsdom = Promise.promisifyAll(_jsdom)

import {waitForResolves} from 'react-redux-resolve'


export const jsdomEnv = () => jsdom.envAsync('', ['http://code.jquery.com/jquery.js']) // TODO: Use local copy

const getFullUrl = (req) => {
    return `${ampPackageJson.siteUrl}${req.url}`
}

const initializeStore = (req, dataInitFunction) => {
    return jsdomEnv().then((window) => {
        const createdStore = createConnectedStore(window, getFullUrl(req), dataInitFunction)

        const renderProps = {
            location: {},
            components: [App],
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
    initializeStore(req, initProductDetailsPage)
        .then((store) => render(req, res, store, productDetails.default, productDetails.styles))
        .catch(next)
}

const productListPage = (req, res, next) => {
    initializeStore(req, initProductListPage)
        .then((store) => render(req, res, store, productList.default, productList.styles))
        .catch(next)
}

const homePage = (req, res, next) => {
    initializeStore(req, initHomePage)
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
