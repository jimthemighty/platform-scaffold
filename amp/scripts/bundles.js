#!/usr/bin/env node
const process = require('process')
const yargs = require('yargs');
const path = require('path');
const common = require('./common');
const child_process = require('child_process')
const Promise = require('Bluebird')
const fs = Promise.promisifyAll(require('fs'))
const ne = require('node-exceptions')
const fetch = require('node-fetch')

const {info, error, step} = common

const gitRevisionLength = 40

const mobifyCloudURL = process.env['MOBIFY_CLOUD_URL'] || 'https://cloud.mobify.com/'
const listCreateURL = (projectSlug) => `${mobifyCloudURL}/api/v2/projects/${projectSlug}/amp/bundles/`

class LogicalException extends ne.LogicalException {}
class HttpException extends ne.HttpException {}

const abort = (msg) => {throw new LogicalException(msg)}

const win = process.platform === 'win32'
const home = win ? process.env.USERPROFILE : process.env.HOME
const configFile = path.join(home, '.mobify')

const pprint = (obj) => JSON.stringify(obj, null, 4)

/**
 * Fetch and reject with a readable error, if appropriate.
 */
const safeFetch = (input, init) => fetch(input, init)
    .then(res => {
        return res.ok ? res : Promise.reject(new HttpException(res.statusText, res.status))
    })

const getCredentials = () => {
    const override = process.env['MOBIFY_DEPLOYMENT_CREDENTIALS']
    const json = override !== undefined ? Promise.resolve(override) : fs.readFileAsync(configFile)

    return json
        .then(json => JSON.parse(json))
        .then(d => ({username: d.username, api_key: d.api_key}))
        .catch(e => abort(
            `Credentials file "${configFile}" not found or invalid\n` +
            'Visit https://cloud.mobify.com/account for steps on authorizing your computer to push bundles.'
        ))
}

const headers = ({api_key}) => ({
    'User-Agent': `amp-sdk`,
    'Authorization': `Bearer ${api_key}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
})

const list = ({projectSlug}) => {
    const url = listCreateURL(projectSlug)
    return getCredentials()
        .then(credentials => safeFetch(url, {
            method: 'GET',
            headers: headers(credentials)
        }))
        .then(res => res.json())
        .then(data => info(pprint(data)))
}

const upload = ({projectSlug, file}) => {
    const url = listCreateURL(projectSlug)
    step(`Uploading bundle "${file}" to "${url}"`)
    const parsed = path.parse(file)
    parsed.ext !== '.zip' && abort('Expected a zip file')
    parsed.name.length !== gitRevisionLength && abort(`Expected a ${gitRevisionLength}-character git revision`)

    const buildRequestBody = () => (
        fs.readFileAsync(file)
        .then(buffer => buffer.toString('base64'))
        .then(base64 => ({
            message: parsed.name,
            artifact: `data:application/zip;base64,${base64}`
        }))
    )

    return Promise.all([getCredentials(), buildRequestBody()])
        .then(([credentials, body]) => safeFetch(url, {
            method: 'POST',
            headers: headers(credentials),
            body: JSON.stringify(body)
        }))
        .then(res => res.json())
        .then(data => info(pprint(data)))
}

const main = () => {
    const argv = (
        yargs
        .usage('Manage AMP bundles deployed through Mobify Cloud\n\nUsage: $0 <command> [options]')
        .command('list <projectSlug>', 'List uploaded bundles')
        .command('upload <projectSlug> <file>', 'Upload a new bundle')
        .demandCommand()
        .help()
        .argv
    )

    const command = argv._[0]
    const commands = {list, upload}

    Promise.resolve()
        .then(_ => commands[command](argv))
        .catch(e => {
            if (e instanceof LogicalException) {
                error(e.message)
                process.exitCode = 1
            } else {
                throw e
            }
        }
    )
}


if (require.main === module) {
    main()
}