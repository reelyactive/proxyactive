/*
 * Copyright reelyActive 2016
 * We believe in an open Internet of Things
 */

const assert = require('assert');
const util = require('../../lib/util');
const proxify = util.proxify;
const configureRoute = util.configureRoute;

describe('Util', function() {

  describe('proxify works', function(done) {

    it('with defaults', function(done) {
      var expected = '/proxy/?url=http://test.com';
      assert.equal(proxify('http://test.com'), expected);
      return done();
    });

    it('with a specified route name', function(done) {
      var expected = '/myroutename/?url=http://test.com';
      assert.equal(proxify('http://test.com', { routeName: 'myroutename' }), expected);
      return done();
    });

    it('with base url', function(done) {
      var expected = 'https://a.com/proxy/?url=http://test.com';
      assert.equal(proxify('http://test.com', { baseUrl: 'https://a.com' }), expected);
      return done();
    });

    it('with proxyHttps enabled', function(done) {
      var expected = 'https://a.com/proxy/?url=https://test.com';
      const options = {
        baseUrl: 'https://a.com',
        proxifyHttps: true
      };
      assert.equal(proxify('https://test.com', options), expected);
      return done();
    });

    it('with proxyHttps disabled', function(done) {
      var expected = 'https://test.com';
      const options = {
        baseUrl: 'https://a.com',
        proxifyHttps: false
      };
      assert.equal(proxify('https://test.com', options), expected);
      return done();
    });

    it('with no reproxifying', function(done) {
      var expected = '/proxy/?url=http://test.com';
      assert.equal(proxify('/proxy/?url=http://test.com'), expected);
      return done();
    });

    it('without mis interpreting an url', function(done) {
      var expected = '/proxy/?url=http://test.com/proxy/url/?url=123';
      assert.equal(proxify('http://test.com/proxy/url/?url=123'), expected);
      return done();
    });


  });

  describe('configureRoute', function(done) {

    it('with no app, throws error', function(done) {
      assert.throws(configureRoute);
      return done();
    });

    it('configures route correctly', function(done) {
      var app = {
        use: function() {
          if (arguments[0] === '/another') {
            var router = arguments[1];
            assert(router);
            router.stack.forEach(function(r) {
              if (r.route && r.route.path) {
                assert.equal(r.route.path, '/');
              }
            })
          } else {
            if (typeof arguments[0] === 'function') {
              var middleware = arguments[0];
              assert(middleware);
              var req = {};
              middleware(req, {}, function() {
                assert(req.proxify);
                return done();
              })
            } else {
              // proxyRouteName was not properly set, throw error
              throw Error('proxyRouteName was not properly set.')
            }
          }

        }
      }
      return configureRoute(app, { proxyRouteName: 'another' });
    });
  });

});