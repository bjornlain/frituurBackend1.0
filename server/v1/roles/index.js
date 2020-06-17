// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/roles.create', controller.create);
router.post('/roles.delete', controller.delete);
router.get('/roles.info', controller.info);
router.get('/roles.list', controller.list);
router.post('/roles.update', controller.update);


// CONSTRUCTOR
module.exports = router;