// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.get('/ping.info', controller.info);


// CONSTRUCTOR
module.exports = router;