import sourceMapSupport from 'source-map-support'
sourceMapSupport.install()

import ReactInjection from 'react-dom/lib/ReactInjection'

// Whitelist the 'on' attribute, frequently used with AMP. This must be done once,
// before any rendering happens.
ReactInjection.DOMProperty.injectDOMPropertyConfig({
    isCustomAttribute: (attributeName) => (
        ['on'].indexOf(attributeName) >= 0 || attributeName.match('-')
    )
})

import process from 'process'
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
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

import {initializeStore} from './data-integration/connectedStore'
import {PAGE_TITLE} from './data-integration/constants'
import {fontServe} from './templates/font-serve'


const getFullUrl = (req) => {
    return `${ampPackageJson.siteUrl}${req.url}`
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
        ampScriptIncludes: scripts.items().join('\n'),
        fontServe: fontServe()
    })
    res.send(rendered)
}

const handlePage = (page) => (req, res, next) => {
    initializeStore(getFullUrl(req), page.default)
        .then((store) => render(req, res, store, page.default, page.styles))
        .catch(next)
}

const onLambda = process.env.hasOwnProperty('AWS_LAMBDA_FUNCTION_NAME')

const app = express()

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(onLambda ? 'short' : 'dev'))
}

app.get('/', handlePage(home))
app.get('/potions.html', handlePage(productList))
app.get('/books.html', handlePage(productList))
app.get('/ingredients.html', handlePage(productList))
app.get('/supplies.html', handlePage(productList))
app.get('/new-arrivals.html', handlePage(productList))
app.get('/charms.html', handlePage(productList))
app.get('/checkout/cart/configure/id/*/product_id/*/', handlePage(productDetails))
app.get('*.html', handlePage(productDetails))

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
