// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/auth.forgot', controller.forgot);
router.post('/auth.invite', controller.invite);
router.post('/auth.login', controller.login);
router.post('/auth.refresh', controller.refresh);
router.post('/auth.reset', controller.reset);


// CONSTRUCTOR
module.exports = router;