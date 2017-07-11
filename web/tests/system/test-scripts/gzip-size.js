#!/usr/bin/env node
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */


/* eslint-disable import/no-commonjs*/
const fs = require('fs')
const path = require('path')
const walk = require('walk')
const chalk = require('chalk')
const gzipSize = require('gzip-size')

/* eslint-disable no-undef */
/* Path to build directory */
const buildDir = process.argv[2] || 'build'

/* Path to JSON containing file size thresholds */
const configFile = process.argv[3] || path.resolve(__dirname, 'gzip-size-config.json')
/* Parse file-size-config.json file */
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'))
const files = config.files

let failure = false

/**
* Run the following with npm run test:gzip-size
* It verifies the gzipped files within the build folder against the maximum file sizes set in file-size-config.json
* The test will fail if it goes above the threshold.
*/

const options = {
    listeners: {
        file: (root, fileStats, next) => {
            const filePath = path.join(root, fileStats.name)
            /* Checks the file - if it's in the list of files in the file-size-config.json */
            for (const file in files) {
                if (fileStats.name === file) {
                    /* Get the gzipped file size and parse file-size-config.json*/
                    const source = fs.readFileSync(filePath, 'utf8')
                    const gzipped = gzipSize.sync(source)
                    const fileMax = files[file]
                    if (gzipped > fileMax) {
                        failure = true
                        console.log(chalk.red(`${filePath} is ${gzipped} bytes. It is bigger than ${fileMax} bytes!\n`))
                    }
                }
            }
            next()
        },
        errors: (root, nodeStatsArray, next) => {
            next()
        },
        end: () => {
            if (failure === false) {
                console.log(chalk.green(`Success! All files are below the size threshold.`))
            } else {
                console.log(chalk.red(`Run 'npm run analyze-build' to see what is contributing to large files.`))
            }
        }
    }
}

if (fs.existsSync(buildDir)) {
    console.log(`Verifying gzipped build files are not larger than thresholds from ${configFile}...`)
    walk.walkSync(buildDir, options)
} else {
    console.log(`Run 'npm run prod:build' to generate a build, then 'npm run test:gzip-size path/to/build/output path/to/config/file'`)
}

if (failure) {
    process.exit(1)
} else {
    process.exit(0)
}
