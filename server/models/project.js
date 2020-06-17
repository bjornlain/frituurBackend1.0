// REQUIRES
const mongoose = require('mongoose');


// ENUMERATIONS
const Kinds = Object.freeze({
  Business: 'business',
  Software: 'software',
});


// SCHEMA PROPERTIES
const projectSchema = new mongoose.Schema({
  avatar: { trim: true, type: String },
  category: { trim: true, type: String },
  counter: { default: 1, required: true, select: false, type: Number },
  deleted: { default: false, required: true, type: Boolean },
  description: { trim: true, type: String },
  key: { index: true, maxlength: 6, required: true, trim: true, type: String, unique: true, uppercase: true },
  kind: { default: 'software', enum: Object.values(Kinds), required: true, type: String },
  lead: { ref: 'User', required: true, type: mongoose.Schema.Types.ObjectId },
  name: { required: true, trim: true, type: String },
  url: { trim: true, type: String },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// STATICS
Object.assign(projectSchema.statics, { Kinds });


// CONSTRUCTOR
module.exports = mongoose.model('Project', projectSchema);


// PUBLIC PROPERTIES
module.exports.kinds = Kinds;