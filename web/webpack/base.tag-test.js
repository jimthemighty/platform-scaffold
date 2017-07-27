/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: './build'
    },
    entry: './tests/tag/index.js',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'tag.test.js'
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
            },
            {
                test: /\.html$/,
                use: 'text-loader'
            }
        ],
    },
    plugins: [
        new CopyPlugin([
            {from: path.resolve(process.cwd(), 'tests/tag/fixtures/'), to: '.'}
        ])
    ]
}
