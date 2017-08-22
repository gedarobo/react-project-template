const express = require('express')
const httpProxy = require('http-proxy')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.dev.config')

const app = express()
const port = 3000
const apiProxy = httpProxy.createProxyServer()

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))

// HMR를 이용하기 위한 설정
app.use(webpackHotMiddleware(compiler))

// 실제 Back-End API와 연동 테스트를 위한 proxy 설정
app.use('/api/*', function (req, res) {
    req.url = req.originalUrl
    apiProxy.web(req, res, {
        changeOrigin: true,
        target: 'http://'       // 실제 API server URL
    })
})

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
    }
})