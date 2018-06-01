const path = require('path')
const merge = require('webpack-merge')

const prodConfig = {
    NODE_ENV: '"production"'
}
const devConfig = merge(prodConfig, { NODE_ENV: '"development"' })

module.exports = {
    build: {
        env: prodConfig,
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: devConfig,
        port: 5050,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        cssSourceMap: false
    }
}