// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/insurances.create', controller.create);
router.post('/insurances.delete', controller.delete);
router.get('/insurances.info', controller.info);
router.get('/insurances.list', controller.list);
router.post('/insurances.update', controller.update);


// CONSTRUCTOR
module.exports = router;