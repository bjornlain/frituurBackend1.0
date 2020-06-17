// REQUIRES
const mongoose = require('mongoose');

const addressSchema = require('./address');


// ENUMERATIONS
const CivilStatuses = Object.freeze({
  Divorced: 'divorced',
  Married: 'married',
  Single: 'single',
  Together: 'together',
  Widow_Widower: 'widow_widower',
});

const Genders = Object.freeze({
  Female: 'female',
  Male: 'male',
});

const Relations = Object.freeze({
  Spouse: 'spouse',
});


// SCHEMA PROPERTIES
const contactSchema = new mongoose.Schema({
  email: { trim: true, type: String },
  mobile: { trim: true, type: String },
  phone: { trim: true, type: String },
}, { _id: false, id: false, versionKey: false });

const employeeSchema = new mongoose.Schema({
  address: { type: addressSchema },
  avatar: { trim: true, type: String },
  bank_account: {
    bic: { trim: true, type: String },
    iban: { trim: true, type: String },
  },
  birth_date: { required: true, type: Date },
  birth_place: { trim: true, type: String },
  civil_status: { enum: Object.values(CivilStatuses), required: true, trim: true, type: String },
  deleted: { default: false, required: true, type: Boolean },
  emergency_contact: {
    name: { trim: true, type: String },
    phone: { trim: true, type: String },
    relation: { enum: Object.values(Relations), trim: true, type: String },
  },
  first_name: { required: true, trim: true, type: String },
  gender: { enum: Object.values(Genders), required: true, trim: true, type: String },
  identity_card_number: { trim: true, type: String },
  language: { trim: true, type: String },
  last_name: { required: true, trim: true, type: String },
  manager: { ref: 'Employee', type: mongoose.Schema.Types.ObjectId },
  nationality: { trim: true, type: String },
  personal_contact: { type: contactSchema },
  position: { trim: true, type: String },
  social_security_number: { trim: true, type: String },
  teams: { default: undefined, trim: true, type: [String] },
  wages: [{
    currency: { required: true, trim: true, type: String }, // TODO - USE ENUMERATION WITH POSSIBLE VALUES
    date: { required: true, type: Date },
    kind: { required: true, type: String }, // TODO - USE ENUMERATION WITH POSSIBLE VALUES
    rate: { min: 0, required: true, type: Number },
  }],
  work_contact: { type: contactSchema },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// VIRTUAL PROPERTIES
employeeSchema.virtual('name').get(function() {
  return `${this.first_name} ${this.last_name}`;
});


// STATICS
Object.assign(employeeSchema.statics, { CivilStatuses, Genders, Relations });


// CONSTRUCTOR
module.exports = mongoose.model('Employee', employeeSchema);


// PUBLIC PROPERTIES
module.exports.civil_statuses = CivilStatuses;
module.exports.genders = Genders;
module.exports.relations = Relations;