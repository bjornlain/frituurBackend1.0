// REQUIRES
const express = require('express');

const controller = require('./controller');

// PRIVATE PROPERTIES
const router = express.Router();

// ROUTES
router.post('/invoices.create', controller.create);
router.post('/invoices.delete', controller.delete);
router.get('/invoices.info', controller.info);
router.get('/invoices.list', controller.list);
router.post('/invoices.update', controller.update);
router.get('/invoices.vatPercentages', controller.vatPercentages);

// CONSTRUCTOR
module.exports = router;