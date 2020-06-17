// REQUIRES
const mongoose = require('mongoose');


// SCHEMA PROPERTIES
const invoiceSchema = new mongoose.Schema({
  client: { ref: 'Client', type: mongoose.Schema.Types.ObjectId },
  date: { type: Date, default: Date.now },
  deleted: { default: false, required: true, type: Boolean },
  items: [{
    amount: { min: 0, type: Number },
    desciption: { trim: true, type: String },
    quantity: { min: 0, type: Number },
    vat_percentage: { type: Number },
  }],
  number: { type: String, trim: true },
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// CONSTRUCTOR
module.exports = mongoose.model('Invoice', invoiceSchema);