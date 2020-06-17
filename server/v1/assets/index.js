// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/assets.create', controller.create);
router.post('/assets.delete', controller.delete);
router.get('/assets.info', controller.info);
router.get('/assets.list', controller.list);
router.post('/assets.update', controller.update);


// CONSTRUCTOR
module.exports = router;