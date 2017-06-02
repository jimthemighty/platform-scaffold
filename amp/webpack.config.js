const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const autoprefixer = require('autoprefixer');

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
                    {loader: 'css-loader?-autoprefixer&-url', options: {minimize : true}},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'}
                ]
            },
            {
                test: /\.svg$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: () => [
                    autoprefixer({
                        browsers: [
                            'iOS >= 9.0',
                            'Android >= 4.4.4',
                            'last 4 ChromeAndroid versions'
                        ]
                    })
                ]
            }
        })
    ],
    devtool: 'sourcemap'
}
