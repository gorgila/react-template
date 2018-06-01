const path = require('path')
const config = require('../config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const packPath = function(_path) {
    return path.posix.join(config.build.assetsSubDirectory, _path)
}

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['style-loader', 'css-loader'])
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["node_modules/compass-mixins/lib"],
                            sourceMap: config.build.productionSourceMap
                        }
                    }],
                    fallback: "style-loader"
                })
            }
        ]
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
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: packPath('js/[name].js'),
        chunkFilename: packPath('js/[name].[chunkhash].min.js')
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env': config.build.env }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin(packPath('css/[name].css')),
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'src/template/index.html',
            inject: true,
            chunksSortMode: 'dependency'
        })
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

module.exports = webpackConfig