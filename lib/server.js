/*
 * Copyright reelyActive 2016
 * We believe in an open Internet of Things
 */

const express = require('express');
const proxyactive = require('./index');
const logger = require('./logger');

const DEFAULT_HTTP_PORT = 7000;

function ProxyServer(options) {
  var self = this;
  self.options = options || {};
  self.httpPort = process.env.PORT || options.httpPort || DEFAULT_HTTP_PORT;
  self.app = options.app || express();
  self.app = proxyactive(self.app, { proxyRouteName: options.proxyRouteName });
}

ProxyServer.prototype.run = function(done) {
  var self = this;
  self.server = self.app.listen(self.httpPort, function() {
    logger.info(self.options, 'proxyActive is listening on port %s', self.httpPort);
    return done && done(self.server);
  });
  return self.server
};

ProxyServer.prototype.stop = function(done) {
  var self = this;
  self.server && self.server.close();
  return done && done(self.server);
};


module.exports = ProxyServer;