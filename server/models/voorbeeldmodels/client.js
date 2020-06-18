// REQUIRES
const mongoose = require('mongoose');

const addressSchema = require('../address');

// ENUMERATIONS
const Kinds = Object.freeze({
  Consultancy: 'consultancy',
  Project: 'project',
});


// SCHEMA PROPERTIES
const clientSchema = new mongoose.Schema({
  address: { type: addressSchema },
  deleted: { default: false, required: true, type: Boolean },
  email: { trim: true, type: String },
  kind: { enum: Object.values(Kinds), trim: true, type: String },
  name: { required: true, trim: true, type: String },
  phone: { trim: true, type: String },
  vat_number: { required: true, trim: true, type: String },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// STATICS
Object.assign(clientSchema.statics, { Kinds });


// CONSTRUCTOR
module.exports = mongoose.model('Client', clientSchema);


// PUBLIC PROPERTIES
module.exports.kinds = Kinds;