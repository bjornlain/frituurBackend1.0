// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/organisations.create', controller.create);
router.post('/organisations.delete', controller.delete);
router.get('/organisations.info', controller.info);
router.get('/organisations.list', controller.list);
router.post('/organisations.update', controller.update);


// CONSTRUCTOR
module.exports = router;