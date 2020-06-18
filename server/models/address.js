// REQUIRES
const mongoose = require('mongoose');


// SCHEMA PROPERTIES
const addressSchema = new mongoose.Schema({
  city: { trim: true, type: String },
  country: { trim: true, type: String },
  line1: { trim: true, type: String },
  line2: { trim: true, type: String },
  state: { trim: true, type: String },
  zip_code: { trim: true, type: String },
}, { _id: false, id: false, versionKey: false });


// CONSTRUCTOR
module.exports = addressSchema;