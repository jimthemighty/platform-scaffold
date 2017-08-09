import Promise from 'bluebird'
import _jsdom from 'jsdom'
import fs from 'fs'

import {registerConnector} from 'progressive-web-sdk/dist/integration-manager'

import {Connector} from '../../../../web/app/connectors/_merlins-connector'

import {jqueryResponse} from '../capturejs'

const jsdom = Promise.promisifyAll(_jsdom)

const jqueryDir = process.env.NODE_ENV === 'production' ? '.' : './app/vendor'
const jquery = fs.readFileSync(`${jqueryDir}/jquery.min.js`, 'utf-8')

export const jsdomEnv = () => jsdom.envAsync('', [], {src: jquery})

export const initConnector = (config) => {
    return jsdomEnv().then((window) => {
        registerConnector(Connector({
            jqueryResponse: jqueryResponse(window),
            ...config
        }))
    })
}
