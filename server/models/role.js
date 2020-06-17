// REQUIRES
const mongoose = require('mongoose');


// ENUMERATIONS
const Actions = Object.freeze({
  Create: 'create',
  Delete: 'delete',
  Read: 'read',
  Update: 'update',
});

const Possessions = Object.freeze({
  Any: 'any',
  Own: 'own',
});

const Resources = Object.freeze({
  Assets: 'assets',
  Attachments: 'attachments',
  Auth: 'auth',
  Clients: 'clients',
  Comments: 'comments',
  Contracts: 'contracts',
  Cvs: 'cvs',
  Employees: 'employees',
  Incidents: 'incidents',
  Insurances: 'insurances',
  Invoices: 'invoices',
  Organisations: 'organisations',
  Ping: 'ping',
  Projects: 'projects',
  Roles: 'roles',
  Swagger: 'swagger',
  Tasks: 'tasks',
  Teams: 'teams',
  Users: 'users',
  Vehicles: 'vehicles',
  Worklogs: 'worklogs',
});


// SCHEMA PROPERTIES
const roleSchema = new mongoose.Schema({
  deleted: { default: false, required: true, type: Boolean },
  extend: { trim: true, type: String },
  name: { index: true, required: true, trim: true, type: String, unique: true },
  permissions: [{
    action: { enum: Object.values(Actions), required: true, trim: true, type: String },
    attributes: { default: '*', required: true, trim: true, type: String },
    possession: { enum: Object.values(Possessions), required: true, trim: true, type: String },
    resource: { enum: Object.values(Resources), required: true, trim: true, type: String },
  }],
}, { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: 'version' });


// STATICS
Object.assign(roleSchema.statics, { Actions, Possessions, Resources });


// CONSTRUCTOR
module.exports = mongoose.model('Role', roleSchema);


// PUBLIC PROPERTIES
module.exports.actions = Actions;
module.exports.possessions = Possessions;
module.exports.resources = Resources;