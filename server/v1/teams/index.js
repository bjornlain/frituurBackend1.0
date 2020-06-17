// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.get('/teams.list', controller.list);


// CONSTRUCTOR
module.exports = router;