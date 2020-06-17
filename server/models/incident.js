// REQUIRES
const mongoose = require('mongoose');


// SCHEMA PROPERTIES
const incidentSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  deleted: { default: false, required: true, type: Boolean },
  description: { trim: true, type: String },
  owner: { ref: 'Employee', type: mongoose.Schema.Types.ObjectId },
  title: { required: true, trim: true, type: String },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// CONSTRUCTOR
module.exports = mongoose.model('Incident', incidentSchema);