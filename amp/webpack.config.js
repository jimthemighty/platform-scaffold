const path = require('path');
const webpack = require('webpack');
const baseCommon = require('./webpack/base.common')

module.exports = {
    entry: './app/main.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'main.js',
        library: 'main',
        libraryTarget: 'commonjs2'
    },
    externals: {
        express: 'commonjs express',
        jsdom: 'commonjs jsdom',
        encoding: 'commonjs encoding',
        ajv: 'commonjs ajv'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory=true'
            },
            {
                test: /\.js(x?)$/,
                use: [
                    {loader: "imports-loader?window=>{location: {href: 'https://www.merlinspotions.com/eye-of-newt.html'}},window.Progressive=>{},navigator=>{userAgent: ''}"}
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'css-loader?-autoprefixer&-url', options: {minimize : true}},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'}
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: baseCommon.postcss
            }
        }),
        new webpack.ProvidePlugin({
            fetch: 'node-fetch'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    devtool: 'sourcemap'
}
