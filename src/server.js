import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from '../webpack.config'

import express from 'express'
import proxy from 'proxy-middleware'
import url from 'url'

// -------- proxy ----------------------
const app = express();
// proxy the request for static assets
app.use('/assets', proxy(url.parse('http://localhost:7071/assets')));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// ------ webpack-dev-server ------------------
const server = new WebpackDevServer(webpack(config), {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/assets/",

    stats: { colors: true }
});

// run the two servers
server.listen(7071, "localhost", function() {});
app.listen(7070);