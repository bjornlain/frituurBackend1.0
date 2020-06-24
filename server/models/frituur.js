// REQUIRES
const mongoose = require('mongoose');

// SCHEMA PROPERTIES
const frituurSchema = new mongoose.Schema({
  name: { required: true, type: String },
  straat: { required: true, type: String },
  nummer: { required: true, type: Number },
  postcode: { required: true, type: Number },
  plaats: { required: true, type: String },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// CONSTRUCTOR
module.exports = mongoose.model('Frituur', frituurSchema);