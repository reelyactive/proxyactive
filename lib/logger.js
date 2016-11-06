/*
 * Copyright reelyActive 2016
 * We believe in an open Internet of Things
 */

var bunyan = require('bunyan');
var path = require('path');

const TAG = "proxyActive";
var options = {
  name: TAG,
  level: process.env.DEBUG ? 'debug' : 'info',
  serializers: {
    req: function(req) {
      return {
        method: req.method,
        url: req.url,
        // headers: req.headers,
        query: req.query,
        params: req.params
      }
    }
  }
};


if (process.env.NODE_ENV === 'production') {
  options.streams = [{
    type: 'rotating-file',
    path: path.join(process.env.LOG_DIR || '', TAG + '.log'),
    period: '1d',   // daily rotation
    count: 7        // keep 7 back copies
  }];
}

var logger = bunyan.createLogger(options);

module.exports = logger;