/*
 * Copyright reelyActive 2016
 * We believe in an open Internet of Things
 */

var express = require('express');
var request = require('request');

const logger = require('../logger');

var router = express.Router();

const fetch = function(req, res) {
  var url = req.query.url;
  logger.info('Proxying URL %s', url);
  logger.debug({ req: req });
  if (url) {
    request.get({
        uri: url,
        headers: {
          'Accept': req.headers.Accept,
          'Accept-Encoding': req.headers['Accept-Encoding']
        }
      }
    ).on('error', function(err) {
      logger.error({ err: err });
      return res.json({
        success: false,
        message: 'Error: ' + err.message
      });
    }).pipe(res);
  } else {
    const message = 'Empty URL';
    logger.error(message);
    return res.json({
      success: false,
      message: message
    });
  }
};
router.route('/').get(fetch);

module.exports = router;
module.exports.fetch = fetch;