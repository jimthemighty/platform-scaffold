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

const {success, info, error, step} = common

const gitRevisionLength = 40

const mobifyCloudURL = `http://cloud-dev.mobify.com:8000`
const listCreateURL = (projectSlug) => `${mobifyCloudURL}/api/v2/projects/${projectSlug}/amp/bundles/`

class LogicalException extends ne.LogicalException {}

const abort = (msg) => {throw new LogicalException(msg)}

const win = process.platform === 'win32'
const home = win ? process.env.USERPROFILE : process.env.HOME
const configFile = path.join(home, '.mobify')


const getCredentials = () => (
    fs.readFileAsync(configFile)
        .then(json => JSON.parse(json))
        .then(d => ({username: d.username, api_key: d.api_key}))
        .catch(e => abort(
            `Credentials file "${configFile}" not found or invalid\n` +
            'Visit https://cloud.mobify.com/account for steps on authorizing your computer to push bundles.'
        ))
)

const headers = ({api_key}) => ({
    'User-Agent': `amp-sdk`,
    'Authorization': `Bearer ${api_key}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
})

const list = ({projectSlug}) => {
    const url = listCreateURL(projectSlug)
    return getCredentials()
        .then(credentials => fetch(url, {
            method: 'GET',
            headers: headers(credentials)
        }))
        .then(res => res.json())
        .then(data => info(JSON.stringify(data, null, 4)))
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
            message: 'message',
            artifact: `data:application/zip;base64,${base64}`
        }))
    )

    return Promise.all([getCredentials(), buildRequestBody()])
        .then(([credentials, body]) => fetch(url, {
            method: 'POST',
            headers: headers(credentials),
            body: JSON.stringify(body)
        }))
        .then(res => res.json())
        .then(data => info(JSON.stringify(data, null, 4)))
}

const main = () => {
    const argv = (
        yargs
        .usage('Usage: $0 <command> [options]')
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
