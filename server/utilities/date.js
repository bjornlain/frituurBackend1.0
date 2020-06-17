// REQUIRES
const moment = require('moment-range').extendMoment(require('moment'));


// PUBLIC METHODS
module.exports.range = function(from, to, weekend = false) {
  return Array.from(moment.range(from, to).by('days')).filter((day) => weekend || day.isoWeekday() < 6);
};