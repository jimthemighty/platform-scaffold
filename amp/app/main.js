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
import Home from './containers/home/container'
import ProductDetails from './containers/product-details/container'
import ProductList from './containers/product-list/container'
import App from './containers/app/container'

import * as ampSDK from './amp-sdk'
import ampPage from './templates/amp-page'

import {initializeStore} from './data-integration/connectedStore'
import {PAGE_TITLE} from './data-integration/constants'


import globalStyles from './styles/global.scss'
import styles from './styles'

const fonts = [
    '<link href="https://fonts.googleapis.com/css?family=Oswald:200,400" rel="stylesheet">'
]


const getFullUrl = (req) => {
    return `${ampPackageJson.siteUrl}${req.url}`
}

const render = (req, res, store, component) => {
    const components = new Set()

    const body = ReactDOMServer.renderToStaticMarkup(
        <ampSDK.AmpContext trackRender={components.add.bind(components)}>
            <Provider store={store}>
                <App>
                    <Analytics templateName={component.templateName} projectSlug={ampPackageJson.cloudSlug} gaAccount={ampPackageJson.gaAccount} />
                    {React.createElement(component, {}, null)}
                </App>
            </Provider>
        </ampSDK.AmpContext>
    )

    const scriptIncludes = []
    const styleIncludes = [globalStyles]

    components.forEach((component) => {
        Array.prototype.push.apply(scriptIncludes, component.scripts || [])
        Array.prototype.push.apply(styleIncludes, styles.get(component) || [])
    })

    const state = store.getState()
    const rendered = ampPage({
        title: state.ui.app.get(PAGE_TITLE),
        canonicalURL: getFullUrl(req),
        body,
        css: styleIncludes.map((x) => x.toString().trim()).join('\n'),
        scriptIncludes: scriptIncludes.join('\n'),
        fontIncludes: fonts.join('\n')
    })
    res.send(rendered)
}


const productDetailsPage = (req, res, next) => {
    initializeStore(getFullUrl(req), ProductDetails)
        .then((store) => render(req, res, store, ProductDetails))
        .catch(next)
}

const productListPage = (req, res, next) => {
    initializeStore(getFullUrl(req), ProductList)
        .then((store) => render(req, res, store, ProductList))
        .catch(next)
}

const homePage = (req, res, next) => {
    initializeStore(getFullUrl(req), Home)
        .then((store) => render(req, res, store, Home))
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
