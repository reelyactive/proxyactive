/*
 * Copyright reelyActive 2016
 * We believe in an open Internet of Things
 */

const sinon = require('sinon');
const assert = require('assert');
const ProxyServer = require('../../lib/server');
const request = require('request');

const PORT = 7200
const BASE_URL = 'http://localhost:' + PORT;

var HEADERS_JSON = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Accept-Encoding': 'gzip'
};

describe('ProxyServer', function() {
  before(function() {
    var self = this;
    var options = {
      httpPort: PORT
    };
    self.proxyServer = new ProxyServer(options);

    self.proxyServer.app.get('/data.json', function(req, res) {
      return res.send(JSON.stringify({ "foo": "bar" }));
    });

    self.proxyServer.run();
  });

  it('is configured correctly', function(done) {
    var self = this;
    assert.equal(self.proxyServer.httpPort, PORT);
    return done();
  });

  it('returns the right data', function(done) {
    const query = {
      url: [BASE_URL, 'data.json'].join('/')
    };

    const url = [BASE_URL, 'proxy'].join('/');
    request.get(url, {
      qs: query,
      headers: HEADERS_JSON
    }, function(req, res) {
      assert.equal(res.statusCode, '200');
      assert.deepEqual(JSON.parse(res.body), { "foo": "bar" });
      done();
    });
  });
});
