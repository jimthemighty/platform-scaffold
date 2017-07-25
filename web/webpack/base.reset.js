/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const webpack = require('webpack')
const baseCommon = require('./base.common')

const webPackageJson = require('../package.json')

module.exports = {
    devtool: 'cheap-source-map',
    entry: {
        reset: './app/reset-bundle-loader.js'
    },
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js']
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
        ],
    },
    plugins: [
        ...baseCommon.plugins,
        new webpack.DefinePlugin({
            PROJECT_SLUG: `'${webPackageJson.projectSlug}'`,
            AJS_SLUG: `'${webPackageJson.aJSSlug}'`
        })
    ]
}
