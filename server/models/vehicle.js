// REQUIRES
const mongoose = require('mongoose');


// ENUMERATIONS
const Fuels = Object.freeze({
  Diesel: 'diesel',
  Hybrid: 'hybrid',
  Petrol: 'petrol',
});

const Kinds = Object.freeze({
  Bicycle: 'bicycle',
  Car: 'car',
  Motorbike: 'motorbike',
});


// SCHEMA PROPERTIES
const vehicleSchema = new mongoose.Schema({
  avatar: { trim: true, type: String },
  brand: { required: true, trim: true, type: String },
  chassis_number: { trim: true, type: String },
  co2_nedc: { min: 0, type: Number },
  co2_wltp: { min: 0, type: Number },
  color: { required: true, trim: true, type: String },
  contract: {
    date: { type: Date },
    initial_amount: { min: 0, type: Number },
    kind: { trim: true, type: String },
    monthly_amount: { min: 0, type: Number },
    residual_value: { min: 0, type: Number },
    runtime: { min: 0, type: Number },
    supplier: { trim: true, type: String },
  },
  deleted: { default: false, required: true, type: Boolean },
  description: { trim: true, type: String },
  fuel: { default: Fuels.Diesel, enum: Object.values(Fuels), required: true, trim: true, type: String },
  hp: { min: 0, type: Number },
  initial_registration: { required: true, type: Date },
  kind: { default: Kinds.Car, enum: Object.values(Kinds), required: true, trim: true, type: String },
  model: { required: true, trim: true, type: String },
  owner: { ref: 'Employee', type: mongoose.Schema.Types.ObjectId },
  pictures: { default: undefined, trim: true, type: [String] },
  plate: { trim: true, type: String },
  price: { min: 0, type: Number },
  vendor: { trim: true, type: String },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// STATICS
Object.assign(vehicleSchema.statics, { Fuels, Kinds });


// CONSTRUCTOR
module.exports = mongoose.model('Vehicle', vehicleSchema);


// PUBLIC PROPERTIES
module.exports.fuels = Fuels;
module.exports.kinds = Kinds;