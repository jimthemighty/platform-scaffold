/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* global __dirname */
/* eslint-disable import/no-commonjs */

const webpack = require('webpack')
const path = require('path')

const webPackageJson = require('../package.json')

module.exports = {
    devtool: 'cheap-source-map',
    entry: './non-pwa/non-pwa.js',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'non-pwa.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: `${__dirname}/tmp`
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            MESSAGING_ENABLED: `${webPackageJson.messagingEnabled}`,
            // These are defined as string constants
            MESSAGING_SITE_ID: `'${webPackageJson.messagingSiteId}'`,
            PROJECT_SLUG: `'${webPackageJson.projectSlug}'`,
            AJS_SLUG: `'${webPackageJson.aJSSlug}'`
        })
    ]
}
