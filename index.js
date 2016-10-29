/*
 * Copyright reelyActive 2016
 * We believe in an open Internet of Things
 */

const Server = require('./lib/server');
const util = require('./lib/util');
const router = require('./lib/routes/proxy');

module.exports = util.configureRoute;
module.exports.util = util;
module.exports.Server = Server;
module.exports.router = router;
