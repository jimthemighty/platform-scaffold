#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')

/**
 * Surface some useful information from the HTML and JSON reports generated by Lighthouse
 */

const htmlReport = fs.readFileSync('lighthouse/audit-local.report.html', 'utf8')

const jsonResults = JSON.parse(fs.readFileSync('lighthouse/audit-local.report.json', 'utf8'))

// Tell me about some performance metrics that are important to me.
console.log(`Time to interactive: ${jsonResults.audits['time-to-interactive'].displayValue}`)
console.log(`${jsonResults.audits['total-byte-weight'].displayValue}`)

// Still needed because JSON report does not have overall score.
// I confirm that I read & accept http://stackoverflow.com/a/1732454/899937
const results = htmlReport.match(/<span class="section-result__points">(.*)<\/span>/)

const actualLighthouseScore = parseInt(results[1])
// min_lighthouse_score can be adjusted in CI
const minimumLighthouseScore = parseInt(process.env.min_lighthouse_score || process.env.npm_package_config_min_lighthouse_score)

const minifiedBundleSize = 137

let failure = false

if (actualLighthouseScore < minimumLighthouseScore) {
    console.error(chalk.red(`Lighthouse score is lower than required! ${actualLighthouseScore} < ${minimumLighthouseScore}`))
    failure = true
}

// CDN will not compress files larger than 2MB.
if (minifiedBundleSize > 2000) {
	console.error(chalk.red(`main.js must be less than 2MB to get gzipped on CDN.`))
	failure = true
}

if (failure) {
	console.log(`ERROR`)
	process.exit(1)
} else {
	process.exit(0)
}
