#!/usr/bin/env node

const process = require('process')
const yargs = require('yargs');
const path = require('path');
const common = require('./common');
const child_process = require('child_process')
const Promise = require('Bluebird')
const fs = Promise.promisifyAll(require('fs'))
const ne = require('node-exceptions')

const {success, info, error, step} = common

const gitRevisionLength = 40

const mobifyCloudURL = `https://cloud.mobify.com`
const listCreateURL = (projectSlug) => `${mobifyCloudURL}/api/v2/amp/projects/${projectSlug}/amp/bundles/`

class LogicalException extends ne.LogicalException {}

const abort = (msg) => {throw new LogicalException(msg)}


const list = ({projectSlug}) => {
    const url = listCreateURL(projectSlug)
    step(`Fetching bundles from "${url}"`)
    const bundles = Array.apply(null, new Array(20)).map((_, i) => ({active: i===0, name: `Bundle ${i}`}))
    success(bundles.map(bundle => `${bundle.name} ${bundle.active ? "(active)" : ""} `).join('\n'))
}

const activate = ({projectSlug, version}) => {
    step(`Activating version "${version}"`)
}

const upload = ({projectSlug, file}) => {
    const url = listCreateURL(projectSlug)
    step(`Uploading bundle "${file}" to "${url}"`)
    // const parsed = path.parse(file)
    // parsed.ext !== '.zip' && abort('Expected a zip file')
    // parsed.name.length !== gitRevisionLength && abort(`Expected a ${gitRevisionLength}-character git revision`)

    fs.readFileAsync(file)
        .then(buffer => buffer.toString('base64'))
        .then(base64 => {
            const payload = {
                message: 'message',
                artifact: base64,
            }
            info(JSON.stringify(payload, null, 4))
        })
}

const main = () => {
    try {
        const argv = (
            yargs
            .usage('Usage: $0 <command> [options]')
            .command('list', 'List uploaded bundles', {}, list)
            .command('activate <version>', 'Activate an uploaded bundle', {}, activate)
            .command('upload <file>', 'Upload a new bundle', {}, upload)
            .demandCommand()
            .help()
            .argv
        )
    } catch (e) {
        if (e instanceof LogicalException) {
            error(e.message)
            process.exitCode = 1
        } else {
            throw e
        }
    }
}


if (require.main === module) {
    main()
}
