const URL = require('url');

const proxyRouter = require('./routes/proxy');

const DEFAULT_PROXY_ROUTE_NAME = 'proxy';

function proxify(url, options) {
  options = options || {};
  if (!options.proxifyHttps) {
    var parsed = URL.parse(url);
    if (parsed.protocol === 'https:') {
      return url;
    }
  }
  var routeName = options.routeName || DEFAULT_PROXY_ROUTE_NAME;
  var baseUrl = options.baseUrl || '';
  var queryString = "?url=" + url;
  return [baseUrl, routeName, queryString].join('/');
}

function configureRoute(app, options) {
  if (!app) {
    throw new Error('app can not be empty');
  }

  options = options || {};
  const proxyRouteName = options.proxyRouteName || DEFAULT_PROXY_ROUTE_NAME;
  if (app) {
    app.use('/' + proxyRouteName, proxyRouter);
    app.use(function(req, res, next) {
      req.proxify = proxify;
      next();
    })
  }
}

module.exports.proxify = proxify;
module.exports.configureRoute = configureRoute;
module.exports.DEFAULT_PROXY_ROUTE_NAME = DEFAULT_PROXY_ROUTE_NAME;