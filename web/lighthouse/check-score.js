#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')

/**
 * So, funny story... Lighthouse doesn't return total score in JSON or CLI formats. Only in HTML.
 * And we're going to parse it here.
 */

const report = fs.readFileSync('./lighthouse/audit-local.html', 'utf8')

// I confirm that I read & accept http://stackoverflow.com/a/1732454/899937
const results = report.match(/<span class="section-result__points">(.*)<\/span>/)

const actualLighthouseScore = parseInt(results[1])
const minimumLighthouseScore = parseInt(process.env.npm_package_config_min_lighthouse_score)

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

// if (actualLighthouseScore < minimumLighthouseScore) {
//     console.log(`Lighthouse score is lower than required! ${actualLighthouseScore} < ${minimumLighthouseScore}`)
//     process.exit(1)
// } else {
//     console.log(`Lighthouse score is fine (${actualLighthouseScore})`)
//     process.exit(0)
// }
