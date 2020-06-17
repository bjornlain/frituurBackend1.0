// REQUIRES
const mongoose = require('mongoose');
const hourSchema = require('./hour');

// SCHEMA PROPERTIES
const weekDateSchema = new mongoose.Schema({
  hour: { type: mongoose.Schema.Types.Object, ref: hourSchema, required: true },
  dayString: { required: true, type: String },
  date: { required: true, type: Date }
});


// CONSTRUCTOR
var weekDateModel = mongoose.model('WeekDate', weekDateSchema);
module.exports = weekDateModel;
