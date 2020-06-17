// REQUIRES
const express = require('express');

const { accesscontrol, passport, response } = require('../middleware');

const assets = require('./assets');
const attachments = require('./attachments');
const auth = require('./auth');
const clients = require('./clients');
const comments = require('./comments');
const contracts = require('./contracts');
const cv = require('./cvs');
const employees = require('./employees');
const incidents = require('./incidents');
const insurances = require('./insurances');
const invoices = require('./invoices');
const organisations = require('./organisations');
const ping = require('./ping');
const projects = require('./projects');
const roles = require('./roles');
const swagger = require('./swagger');
const tasks = require('./tasks');
const teams = require('./teams');
const users = require('./users');
const frituren = require('./frituren');
const vehicles = require('./vehicles');


// PRIVATE PROPERTIES
const router = express.Router();



// MIDDLEWARE
router.use(passport);
router.use(accesscontrol);
router.use(response);


// ROUTES
router.use(assets);
router.use(attachments);
router.use(auth);
router.use(clients);
router.use(comments);
router.use(contracts);
router.use(cv);
router.use(frituren);
router.use(insurances);
router.use(invoices);
router.use(organisations);
router.use(ping);
router.use(projects);
router.use(roles);
router.use(tasks);
router.use(teams);
router.use(users);
router.use(vehicles);



// CONSTRUCTOR
module.exports = router;