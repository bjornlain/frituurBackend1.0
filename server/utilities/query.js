// REQUIRES
const moment = require('moment');

const clone = require('./clone');


// PUBLIC METHODS
module.exports.owned = function(req, query) {
  return Object.assign(query, req.owned && { user: req.user._id });
};

module.exports.where = function(req, condition, properties) {
  const filters = clone(req.query);
  if (filters.date) {
    filters.date = moment(filters.date).toDate();
  } else if (filters.from || filters.to) {
    filters.date = Object.assign(filters.from ? { $gte: moment(filters.from).toDate() } : {}, filters.to ? { $lt: moment(filters.to).toDate() } : {});
  }
  if (filters.search && properties) {
    filters.$or = properties.split(' ').map((property) => Object.defineProperty({}, property, { enumerable: true, value: new RegExp(filters.search, 'i') }));
  }
  ['from', 'limit', 'search', 'skip', 'sort', 'to'].forEach((key) => delete filters[key]);
  Object.keys(filters).forEach((key) => { if (filters[key] === 'null') filters[key] = null; });
  return Object.assign(filters, condition, req.owned && { user: req.user._id });
};