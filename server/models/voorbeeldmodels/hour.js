// REQUIRES
const mongoose = require('mongoose');


// SCHEMA PROPERTIES
const hourSchema = new mongoose.Schema({
  hours: { default: 0, required: true, type: Number },
  minutes: { default: 0, required: true, type: Number },
  seconds: { default: 0, required: true, type: Number },
});


// CONSTRUCTOR
const hourModel = mongoose.model('Hour', hourSchema);
module.exports = hourModel;