const webpack = require('webpack')
const path = require('path')
const config = require('../config')
const projectRoot = path.resolve(__dirname, '../')

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.dev.assetsPublicPath,
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: [
            path.join(__dirname, '../node_modules')
        ],
        alias: {
            '~src': path.resolve(__dirname, '../src'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~pages': path.resolve(__dirname, '../src/pages'),
            '~store': path.resolve(__dirname, '../src/store'),
            '~utils': path.resolve(__dirname, '../src/utils'),
        }
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, '../node_modules')
        ]
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/,
                options: {
                    presets: ['env', 'react'],
                    plugins: ['transform-class-properties'],
                    compact: true
                }
            },
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: projectRoot,
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    }
}