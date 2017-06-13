#!/usr/bin/env node

const fs = require('fs')
// import fs from 'fs'
/**
 * Surface some useful information from the HTML and JSON reports generated by Lighthouse
 */


let fileName

if (fs.existsSync('lighthouse/audit-local.report.html')) {
    fileName = 'audit-local'
} else if (fs.existsSync('lighthouse/audit-prod.report.html')){
    fileName = 'audit-prod'
} else {
	console.log('Error Lighthouse report not found.')
	process.exit(0);
}

const checkLighthouse = function(htmlReport) {
	// Still needed because JSON report does not have overall score.
	// I confirm that I read & accept http://stackoverflow.com/a/1732454/899937
    const results = htmlReport.match(/<span class="section-result__points">(.*)<\/span>/)

    const actualLighthouseScore = parseInt(results[1])
	// min_lighthouse_score can be adjusted in CI
    const minimumLighthouseScore = parseInt(process.env.min_lighthouse_score || process.env.npm_package_config_min_lighthouse_score)

    if (actualLighthouseScore < minimumLighthouseScore) {
        console.log(`Lighthouse score is lower than required! ${actualLighthouseScore} < ${minimumLighthouseScore}`)
        process.exit(1)
    } else {
        console.log(`Lighthouse score is fine (${actualLighthouseScore})`)
        process.exit(0)
    }
}

const checkTTI = function(jsonResults) {
	// Tell me about some performance metrics that are important to me.
    console.log(`Time to interactive: ${jsonResults.audits['time-to-interactive'].displayValue}`)
    console.log(`${jsonResults.audits['total-byte-weight'].displayValue}`)
	// Just dump out this info for now.
    console.log(`${JSON.stringify(jsonResults.audits['total-byte-weight'].extendedInfo.value.results)}`)
}

const htmlReport = fs.readFileSync(`lighthouse/${fileName}.report.html`, 'utf8')
const jsonResults = JSON.parse(fs.readFileSync(`lighthouse/${fileName}.report.json`, 'utf8'))

checkTTI(jsonResults)
checkLighthouse(htmlReport)


