// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/employees.create', controller.create);
router.post('/employees.delete', controller.delete);
router.get('/employees.info', controller.info);
router.get('/employees.list', controller.list);
router.post('/employees.update', controller.update);


// CONSTRUCTOR
module.exports = router;