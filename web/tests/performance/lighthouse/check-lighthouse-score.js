#!/usr/bin/env node
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/no-commonjs */
const fs = require('fs')
const chalk = require('chalk')

/**
 * Surface some useful information from the HTML and JSON reports generated by Lighthouse
 */

let fileName
let failure = false
const reportsDir = 'tests/performance/lighthouse/reports/'

if (fs.existsSync(`${reportsDir}audit-local.report.html`)) {
    fileName = 'audit-local'
} else if (fs.existsSync(`${reportsDir}audit-prod.report.html`)) {
    fileName = 'audit-prod'
} else {
    console.log('Error Lighthouse report not found.')
    process.exit(0)
}

/**
* Verify the Lighthouse score
*/
const checkLighthouse = function(jsonResults) {
    const actualLighthouseScore = Math.round(jsonResults.score)
    // min_lighthouse_score can be adjusted in CI
    const minimumLighthouseScore = parseInt(process.env.min_lighthouse_score || process.env.npm_package_config_min_lighthouse_score)

    if (actualLighthouseScore < minimumLighthouseScore) {
        console.error(chalk.red(`Lighthouse score is lower than required! ${actualLighthouseScore} < ${minimumLighthouseScore}`))
        failure = true
    } else {
        console.log(`Lighthouse score is fine (${actualLighthouseScore})`)
    }
}

/**
* Display some important performance metrics.
*/
const checkTTI = function(jsonResults) {
    console.log(`Time to interactive: ${jsonResults.audits['first-interactive'].displayValue}`)
    console.log(`Analyzing total bundle size...`)
    console.log(`${jsonResults.audits['total-byte-weight'].displayValue}`)
}

const jsonResults = JSON.parse(fs.readFileSync(`${reportsDir}${fileName}.report.json`, 'utf8'))

checkTTI(jsonResults)
checkLighthouse(jsonResults)

if (failure) {
    process.exit(1)
} else {
    process.exit(0)
}
