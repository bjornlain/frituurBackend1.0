// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/frituren.create', controller.create);
router.post('/frituren.delete', controller.delete);
router.get('/frituren.list', controller.list);
router.post('/frituren.update', controller.update);


// CONSTRUCTOR
module.exports = router;