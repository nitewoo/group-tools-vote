var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('../webpack.config')

var express = require('express')
var proxy = require('proxy-middleware')
var url = require('url')

// -------- proxy ----------------------
var app = express();

// proxy the request for static assets
app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));

var session = require('express-session');
app.use(session({
  // genid: function(req) {
  //   return genuuid() // use UUIDs for session IDs
  // },
  secret: 'uuapclient-35-W9krKLXBfeNTo31aUF1k'
}));

app.use('/', require('./casRoutes'));

/**
 sso处理
 */
var cas = require('cas');


app.all('*', function (req, res, next) {
  if (req.method == 'POST' && req.body['logoutRequest']) {
      var parser = new xml2js.Parser();
      parser.parseString(req.body['logoutRequest'], function (err, result) {
        if (!err) {
            console.log(req.body['logoutRequest'])  ;
            var ticket = result['samlp:LogoutRequest']['samlp:SessionIndex'][0];
            // console.log('ticket:'+ticket)  ;
            console.log('logining out:', ticket);
          }
        return next();
      });
    }
    else {
      // This was not a signout request. Proceed normally.
      return next();
    }
});



app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// ------ webpack-dev-server ------------------
var server = new WebpackDevServer(webpack(config), {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/assets/",

    stats: { colors: true }
});

// run the two servers
server.listen(8081, "localhost", function() {});
app.listen(9000);