// REQUIRES
const mongoose = require('mongoose');


// ENUMERATIONS
const Kinds = Object.freeze({
  Bug: 'bug',
  Epic: 'epic',
  Story: 'story',
  SubTask: 'sub_task',
  Task: 'task',
});

const Priorities = Object.freeze({
  High: 'high',
  Highest: 'highest',
  Low: 'low',
  Lowest: 'lowest',
  Medium: 'medium',
});

const Resolutions = Object.freeze({
  Done: 'done',
  Duplicate: 'duplicate',
  Fixed: 'fixed',
  Incomplete: 'incomplete',
  CantReproduce: 'cant_reproduce',
  Unresolved: 'unresolved',
  WontDo: 'wont_do',
  WontFix: 'wont_fix',
});

const Statuses = Object.freeze({
  Acceptance: 'acceptance',
  Closed: 'closed',
  Done: 'done',
  Open: 'open',
  InProgress: 'in_progress',
  Reopened: 'reopened',
  Resolved: 'resolved',
  Review: 'review',
  Todo: 'todo',
});


// SCHEMA PROPERTIES
const taskSchema = new mongoose.Schema({
  assignees: { index: true, ref: 'User', type: [mongoose.Schema.Types.ObjectId] },
  attachments: [{ ref: 'Attachment', type: mongoose.Schema.Types.ObjectId }],
  deleted: { default: false, required: true, type: Boolean },
  description: { trim: true, type: String },
  due: { type: Date },
  key: { index: true, required: true, type: String, unique: true },
  kind: { default: 'task', enum: Object.values(Kinds), required: true, type: String },
  labels: { default: undefined, trim: true, type: [String] },
  parent: { ref: 'Task', type: mongoose.Schema.Types.ObjectId },
  priority: { default: 'medium', enum: Object.values(Priorities), required: true, type: String },
  project: { index: true, ref: 'Project', required: true, type: mongoose.Schema.Types.ObjectId },
  reporter: { ref: 'User', required: true, type: mongoose.Schema.Types.ObjectId },
  resolution: { default: 'unresolved', enum: Object.values(Resolutions), required: true, type: String },
  status: { default: 'todo', enum: Object.values(Statuses), required: true, type: String },
  summary: { required: true, trim: true, type: String },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// HANDLERS
/* taskSchema.pre('validate', async function(next) {
  if (!this.isNew) return next();
  console.log(this.project);
  const project = await require('./project').findOne({ _id: this.project, deleted: false }, '+counter key'); // eslint-disable-line global-require
  console.log(project);
  this.key = `${project.key}-${project.counter}`;
  return next();
});

taskSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  const project = await require('./project').findOne({ _id: this.project, deleted: false }, '+counter'); // eslint-disable-line global-require
  project.counter += 1;
  await project.save();
  return next();
});
 */
// STATICS
Object.assign(taskSchema.statics, { Kinds, Priorities, Resolutions, Statuses });


// CONSTRUCTOR
module.exports = mongoose.model('Task', taskSchema);


// PUBLIC PROPERTIES
module.exports.kinds = Kinds;
module.exports.priorities = Priorities;
module.exports.resolutions = Resolutions;
module.exports.statuses = Statuses;
