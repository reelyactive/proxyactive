/*
 * Copyright reelyActive 2016
 * We believe in an open Internet of Things
 */

const Util = require('./util');
const Server = require('./server');
const router = require('./routes/proxy');

module.exports = Util.configureRoute;
module.exports.Util = Util;
module.exports.Server = Server;
module.exports.router = router;
