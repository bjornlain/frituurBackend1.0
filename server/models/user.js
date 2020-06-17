// REQUIRES
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const config = require('../config');
const { jwt, random } = require('../utilities');


// ENUMERATIONS
const Statuses = Object.freeze({
  Approved: 'approved',
  Denied: 'denied',
  Pending: 'pending',
});


// SCHEMA PROPERTIES
const userSchema = new mongoose.Schema({
  avatar: { trim: true, type: String },
  deleted: { default: false, required: true, type: Boolean },
  email: { index: true, required: true, trim: true, type: String, unique: true },
  name: { required: true, trim: true, type: String },
  password: { default: random(64), required: true, select: false, trim: true, type: String },
  refresh_token: { default: random(64), required: true, select: false, trim: true, type: String },
  role: { index: true, ref: 'Role', required: true, type: mongoose.Schema.Types.ObjectId },
  security_date: { select: false, type: Date },
  security_token: { select: false, trim: true, type: String },
  status: { default: 'pending', enum: Object.values(Statuses), required: true, trim: true, type: String },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// PUBLIC METHODS
userSchema.methods.isApproved = function() {
  return this.status === 'approved';
};

userSchema.methods.toEmail = function() {
  return `${this.name} <${this.email}>`;
};

userSchema.methods.toJWT = async function() {
  this.refresh_token = random(64);
  await this.save();
  return { access_token: this.toToken(), expires_in: config.jwt.expires_in, refresh_token: this.refresh_token, token_type: 'bearer' };
};

userSchema.methods.toToken = function() {
  return jwt.sign({ _id: this._id, avatar: this.avatar || undefined, email: this.email, name: this.name, role: this.role });
};

userSchema.methods.verifyPassword = async function(password) {
  return bcryptjs.compare(password, this.password);
};


// HANDLERS
userSchema.pre('validate', async function(next) {
  let error = false;
  if (this.isModified('password')) this.password = await bcryptjs.hash(this.password, 10);
  if (this.isModified('role')) error = !(await require('./role').findOne({ _id: this.role, deleted: false }, '_id')); // eslint-disable-line global-require
  next(error ? new Error() : null);
});


// STATICS
Object.assign(userSchema.statics, { Statuses });


// CONSTRUCTOR
module.exports = mongoose.model('User', userSchema);


// PUBLIC PROPERTIES
module.exports.statuses = Statuses;