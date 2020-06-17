// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/cvs.create', controller.create);
router.post('/cvs.delete', controller.delete);
router.get('/cvs.info', controller.info);
router.get('/cvs.list', controller.list);
router.post('/cvs.update', controller.update);


// CONSTRUCTOR
module.exports = router;