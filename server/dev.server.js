import webpack from 'webpack'
import webDevServerConfig from '../webpack/dev.config'

import express from 'express'
import compression from 'compression'
import proxy from 'proxy-middleware'
import servefavicon from 'serve-favicon'
import serveStatic from 'serve-static'
import path from 'path'
import url from 'url'
import bodyParser from 'body-parser'


// -------- dev-server ----------------------
const app = express()

const devServerHost = 'localhost'
const devServerPort = 7070

const staticPath = path.resolve(path.join(__dirname, '..', 'static'))
const faviconPath = path.join(staticPath, 'favicon.ico')
const indexPath = path.join(staticPath, 'index.html')

app.use(bodyParser.json())

app.use(compression())
app.use(servefavicon(faviconPath))

// proxy the request for static assets
app.use('/assets', proxy(url.parse('http://localhost:' + webDevServerConfig.devServer.port + '/assets')))

app.get('/api/getTopic', function(req, res) {
  res.json({
    code: 200,
    message: 'success',
    data: [{
      id: '123',
      title: 'topic 1',
      date: '2015-11-11',
      description: 'blah blah balh topic 1111'
    }, {
      id: '333',
      title: 'topic 2',
      date: '2015-10-10',
      description: 'blah blah balh topic 222222222222'
    }]
  })
})

app.use(serveStatic(staticPath))
app.get('/*', function(req, res) {
  res.sendFile(indexPath)
})

// -------- run ----------------------
app.listen(7070)
console.info('dev-server http://' + devServerHost + ':' + devServerPort + ' is on')