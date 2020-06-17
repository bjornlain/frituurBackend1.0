// REQUIRES
const mongoose = require('mongoose');


// SCHEMA PROPERTIES
const worklogSchema = new mongoose.Schema({
  deleted: { default: false, required: true, type: Boolean },
  startDate: { required: true, type: Date },
  endDate: { required: true, type: Date },
  description: { trim: true, type: String },
  task: { ref: 'Task', required: true, type: mongoose.Schema.Types.ObjectId },
  user: { ref: 'User', required: true, type: mongoose.Schema.Types.ObjectId },
  worked: { min: 0, required: true, type: Number },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// CONSTRUCTOR
module.exports = mongoose.model('Worklog', worklogSchema);