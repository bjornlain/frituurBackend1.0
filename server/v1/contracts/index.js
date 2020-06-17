// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/contracts.create', controller.create);
router.post('/contracts.delete', controller.delete);
router.get('/contracts.info', controller.info);
router.get('/contracts.list', controller.list);
router.post('/contracts.update', controller.update);


// CONSTRUCTOR
module.exports = router;