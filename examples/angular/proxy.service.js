(function() {
  'use strict';

  angular
    .module('proxyactive')
    .service('ProxyService', ProxyService);

  function ProxyService() {
    var self = this;

    self.proxify = function(url, options) {
      if (!url) {
        return url;
      }
      options = options || {};
      var proxyRouteName = options.proxyRouteName || 'proxy';
      var baseUrl = options.baseUrl || '';
      var proxifyHttps = options.proxifyHttps;

      if (!proxifyHttps && url.match(/https.*/)) {
        return url;
      }
      var queryString = '?url=' + url;
      return [baseUrl, proxyRouteName, queryString].join('/');
    };
  }
})();


