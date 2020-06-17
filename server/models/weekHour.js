// REQUIRES
const mongoose = require('mongoose');
const hourSchema = require('./hour');

// SCHEMA PROPERTIES
const weekHourSchema = new mongoose.Schema({
  Hour: { type: mongoose.Schema.Types.Mixed, ref: hourSchema, required: true },
  weekNumber: { required: true, type: Number },
  startDay: { required: true, type: Number },
  endDay: { required: true, type: Number },
});


// CONSTRUCTOR
var weekHourModel = mongoose.model('WeekHour', weekHourSchema);
module.exports = weekHourModel;
