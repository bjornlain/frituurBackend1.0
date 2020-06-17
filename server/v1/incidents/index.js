// REQUIRES
const express = require('express');

const controller = require('./controller');

// PRIVATE PROPERTIES
const router = express.Router();

// ROUTES
router.post('/incidents.create', controller.create);
router.post('/incidents.delete', controller.delete);
router.get('/incidents.info', controller.info);
router.get('/incidents.list', controller.list);
router.post('/incidents.update', controller.update);

// CONSTRUCTOR
module.exports = router;