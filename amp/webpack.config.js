const webpack = require('webpack');

const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer')

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
                test: /\.scss$/,
                use: [
                    {loader: 'css-loader', options: {minimize : true}},
                    {lodaer: 'postcss-loader'},
                    {loader: 'sass-loader'}
                ]
            }
        ]
    },
    devtool: 'sourcemap'
}
