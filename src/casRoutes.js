var http = require('http');
var https = require('https');
var url = require('url');
var express = require('express');
var xml2js = require('xml2js');
var router = express.Router();

// 第一次用户请求url
var service;

/**
 * HTTP验证
 * @param req   当前请求request
 * @param res   当前请求response
 * @param ops   uuap验证请求链接参数
 * @param callback  uuap验证请求回调
 */
function validateByHttp(req, res, next, ops, callback) {
    var vUrl = url.format(ops);
    console.log(vUrl);
    http.get(vUrl, function (uuapRes) {
        callback(req, res, next, uuapRes);
    });
}

/**
 * HTTPS验证
 * @param req   当前请求request
 * @param res   当前请求response
 * @param ops   uuap验证请求链接参数
 * @param callback  uuap验证请求回调
 */
function validateByHttps(req, res, next, ops, callback) {
    var vUrl = url.format(ops);
    https.get(vUrl, function (uuapRes) {
        callback(req, res, uuapRes);
    });
}

/**
 * 验证ticket回调
 * @param req   当前请求request
 * @param res   当前请求response
 * @param uuapRes   uuap验证请求response
 */
function validateTicket(req, res, next, uuapRes) {
    var responseText = '';
    uuapRes.on('error', function (e) {
        res.send(e.message);
    });
    uuapRes.on('data', function (chunk) {
        responseText += chunk;
    });
    uuapRes.on('end', function () {
        console.log('responseText', responseText);
        var parser = new xml2js.Parser();
        var statusCode = res.statusCode;
        var userName;
        if (statusCode === 200) {
            console.log('statusCode', statusCode)
            parser.parseString(responseText, function (error, data) {
                if (error) {
                    res.send(error.message);
                } else {
                    userName = data['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];
                    console.log('userName', userName);
                    req.session.views.userName = userName;
                    // console.log('req', req);
                    res.redirect(req.path || '/');

                }

            });
        } else {
            res.send('UUAP验证失败状态吗：' + statusCode);
        }

    });
}

var global = {
  uuap: {
    "protocol": "http",
    "hostname": "itebeta.baidu.com",
    "port": "8100",
    "validateMethod": "/serviceValidate"
  },
  port: '9000'
};

router.all('*', function (req, res, next) {
    var query = req.query;
    req.session = req.session || {};
    var views = req.session.views;
    var ticket = query.ticket;
    var uuapConfig = global.uuap;
    var urlOps;

    // if (true) next();

    console.log('service: ' + decodeURIComponent(service));
    console.log(views)
    // session 验证
    if (views && views.userName) {
        console.log('----------session登录--------------');
        next();
    } else if (ticket) {
        console.log('----------ticket认证--------------');
        // ticket 验证
        !views && (req.session.views = {});
        urlOps = {
            protocol: uuapConfig.protocol,
            hostname: uuapConfig.hostname,
            port: uuapConfig.port,
            pathname: uuapConfig.validateMethod,
            query: {
                ticket: ticket,
                service: service
            }
        };

        if (uuapConfig.protocol === 'http') {
            validateByHttp(req, res, next, urlOps, validateTicket)
        } else {
            validateByHttps(req, res, next, urlOps, validateTicket)
        }
    } else {
        console.log('-----------UUAP登录-------------------');
        service = url.format({
            protocol: req.protocol,
            hostname: req.hostname,
            port: global.port,
            pathname: req.originalUrl
        });
        var redirecturl = url.format({
            protocol: uuapConfig.protocol,
            hostname: uuapConfig.hostname,
            port: uuapConfig.port,
            query: {
                service: service
            }
        });


        // console.log('service', service);
        // console.log('redirecturl', redirecturl);
        res.redirect(redirecturl)
    }

});

module.exports = router;