const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')

Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    mode: 'development',
    module: {
        rules: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.s[a|c]ss$/,
            loader: 'style-loader!css-loader!sass-loader?includePaths[]=' + path.join(__dirname, "../node_modules/compass-mixins/lib")
        }]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        new webpack.DefinePlugin({ 'process.env': config.dev.env }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'app'],
            filename: 'index.html',
            template: 'src/template/index.html',
            // favicon: 'favicon.ico',
            inject: true
        })
    ]
})