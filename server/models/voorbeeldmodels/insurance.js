// REQUIRES
const mongoose = require('mongoose');


// ENUMERATIONS
const ObjectTypes = Object.freeze({
  Employee: 'employee',
  Vehicle: 'vehicle',
});


// SCHEMA PROPERTIES
const insuranceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  deleted: { default: false, required: true, type: Boolean },
  object_id: { required: true, type: mongoose.Schema.Types.ObjectId },
  object_type: { enum: Object.values(ObjectTypes), required: true, trim: true, type: String },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// STATICS
Object.assign(insuranceSchema.statics, { ObjectTypes });


// CONSTRUCTOR
module.exports = mongoose.model('Insurance', insuranceSchema);


// PUBLIC PROPERTIES
module.exports.object_types = ObjectTypes;