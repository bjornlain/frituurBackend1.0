// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/vehicles.create', controller.create);
router.post('/vehicles.delete', controller.delete);
router.get('/vehicles.info', controller.info);
router.get('/vehicles.list', controller.list);
router.get('/vehicles.brands', controller.brands);
router.post('/vehicles.update', controller.update);


// CONSTRUCTOR
module.exports = router;