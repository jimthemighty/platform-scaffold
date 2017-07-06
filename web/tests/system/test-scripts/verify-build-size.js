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
const fileSize = require(path.join(path.resolve('./'), 'tests/system/test-scripts/file-size-config.json'))

// A number denoting maximum file size in bytes.
const FILE_SIZE_LIMIT = fileSize.bundleSize.max

let failure = false

/**
* Run the following with npm run test:build-size
* Traverse the build folder and verify that built files are smaller than a
* defined threshold.
* It also verifies the gzipped files within the build folder against the maximum file sizes set in file-size-config.json
* The test will fail if it goes above the threshold
*/

/* eslint-disable no-undef */
const options = {
    listeners: {
        file: (root, fileStats, next) => {
            const filePath = path.join(root, fileStats.name)
            const fileStat = fs.statSync(filePath)

            if (fileStat.size > FILE_SIZE_LIMIT) {
                failure = true
                console.log(chalk.red(`${filePath} is ${fileStat.size} bytes. It is too big!\n`))
            }


            const source = fs.readFileSync(filePath, 'utf8')
            const gzipped = gzipSize.sync(source)
            const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'file-size-config.json'), 'utf8'))
            const files = config.bundleSize.files

            for (const file in files) {
                if (fileStats.name === file) {
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
                console.log(chalk.green(`Success! All build files are below the size threshold.`))
            } else {
                console.log(chalk.red(`Run 'npm run analyze-build' to see what is contributing to large files.`))
            }
        }
    }
}

if (fs.existsSync('build')) {
    console.log(`Verifying individual file sizes in the build are less than ${FILE_SIZE_LIMIT} bytes...`)
    console.log(`Verifying build files are not larger than threshold in file-size-config.json...`)
    walk.walkSync('build', options)
} else {
    console.log(`Run 'npm prod:build' to generate a build.`)
}

if (failure) {
    process.exit(1)
} else {
    process.exit(0)
}
