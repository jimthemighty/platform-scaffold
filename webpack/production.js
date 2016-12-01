/* eslint-disable import/no-commonjs */
/* eslint-env node */

const webpack = require('webpack')
const assign = require('lodash.assign')

const baseLoaderConfig = require('./base.loader')
const baseMainConfig = require('./base.main')
const workerConfig = require('./base.worker')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Add production flag to main app config
const productionMainConfig = assign(baseMainConfig, {
    // Extend base config with production settings here
    plugins: [].concat(baseMainConfig.plugins, [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        })
    ])
})

baseMainConfig.module.loaders = baseMainConfig.module.loaders.concat({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(['css?-autoprefixer&-url&minification', 'postcss', 'sass']),
    include: [
        /progressive-web-sdk/,
        /app/
    ]
})

workerConfig.plugins = workerConfig.plugins.concat([
    new webpack.DefinePlugin({
        DEBUG: false
    })
])

module.exports = [productionMainConfig, baseLoaderConfig, workerConfig]
