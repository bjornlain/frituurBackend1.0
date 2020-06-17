const { logger } = require('../utilities');
// CONSTRUCTOR
module.exports = function(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (process.env.NODE_ENV !== 'production') logger.error(err); // eslint-disable-line no-console
  return res.status(500).end();
};