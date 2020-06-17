// REQUIRES
const express = require('express');

const controller = require('./controller');

// PRIVATE PROPERTIES
const router = express.Router();

// ROUTES
router.post('/clients.create', controller.create);
router.post('/clients.delete', controller.delete);
router.get('/clients.info', controller.info);
router.get('/clients.kinds', controller.kinds);
router.get('/clients.list', controller.list);
router.post('/clients.update', controller.update);

// CONSTRUCTOR
module.exports = router;