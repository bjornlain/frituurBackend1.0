// REQUIRES
const mongoose = require('mongoose');

const addressSchema = require('../address');


// ENUMERATIONS
const Kinds = Object.freeze({
  BV: 'bv',
  BVBA: 'bvba',
  NV: 'nv',
});


// SCHEMA PROPERTIES
const organisationSchema = new mongoose.Schema({
  address: { type: addressSchema },
  deleted: { default: false, required: true, type: Boolean },
  kind: { enum: Object.values(Kinds), trim: true, type: String },
  name: { required: true, trim: true, type: String },
  registration_number: { required: true, trim: true, type: String },
  social_security_number: { trim: true, type: String },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// STATICS
Object.assign(organisationSchema.statics, { Kinds });


// CONSTRUCTOR
module.exports = mongoose.model('Organisation', organisationSchema);


// PUBLIC PROPERTIES
module.exports.kinds = Kinds;