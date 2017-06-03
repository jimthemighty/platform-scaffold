#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

/**
 * Surface some useful information from the HTML and JSON reports generated by Lighthouse
 */

const htmlReport = fs.readFileSync('lighthouse/audit-local.report.html', 'utf8')
const jsonResults = JSON.parse(fs.readFileSync('lighthouse/audit-local.report.json', 'utf8'))

process.env['TTI'] = jsonResults.audits['time-to-interactive']

// Tell me about some performance metrics that are important to me.
console.log(chalk.yellow(`Time to interactive: ${jsonResults.audits['time-to-interactive'].displayValue}`))
console.log(chalk.yellow(`${jsonResults.audits['total-byte-weight'].displayValue}`))

// Still needed because JSON report does not have overall score.
// I confirm that I read & accept http://stackoverflow.com/a/1732454/899937
const results = htmlReport.match(/<span class="section-result__points">(.*)<\/span>/)

const actualLighthouseScore = parseInt(results[1])
// min_lighthouse_score can be adjusted in CI
const minimumLighthouseScore = parseInt(process.env.min_lighthouse_score || process.env.npm_package_config_min_lighthouse_score)

let failure = false

/**
 * Verify the bundle size. CDN will not compress files larger than 2MB.
 */
 try {
	const stats = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../stats.json'), 'utf8'))
	let children = stats.children
	for (let child in children) {
		let modules = children[child].modules
		for (let module in modules) {
			if (parseInt(modules[module].size) > 2000000) {
				console.error(chalk.red(`${modules[module].identifier} must be less than 2MB to get gzipped on CDN.`))
				failure = true
				break
			}
		}
	}
} catch (err) {
	if (err.code === 'ENOENT') {
		console.log(`Run 'npm run test:stats' to generate stats.json`)
	} else {
		throw err
	}
}

/**
 * Verify the Lighthouse score. 
 */ 
if (actualLighthouseScore < minimumLighthouseScore) {
    console.error(chalk.red(`Lighthouse score is lower than required! ${actualLighthouseScore} < ${minimumLighthouseScore}`))
    failure = true
} else {
	console.log(`Lighthouse score is fine (${actualLighthouseScore})`)
}

if (failure) {
	process.exit(1)
} else {
	process.exit(0)
}
