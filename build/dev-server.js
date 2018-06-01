const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.dev.config')

const port = process.env.PORT || config.dev.port
const app = express()

const compiler = webpack(webpackConfig)
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
})
const hotMiddleware = require('webpack-hot-middleware')(compiler)

compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

const history = require('connect-history-api-fallback')
app.use(history({
    rewrites: [
        { from: 'index', to: '/index.html' }
    ]
}))

app.use(devMiddleware)
app.use(hotMiddleware)

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }

    console.log('Listening at http://localhost:' + port + '\n')
})