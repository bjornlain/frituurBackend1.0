// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/tasks.create', controller.create);
router.post('/tasks.delete', controller.delete);
router.get('/tasks.info', controller.info);
router.get('/tasks.kinds', controller.kinds);
router.get('/tasks.list', controller.list);
router.get('/tasks.priorities', controller.priorities);
router.get('/tasks.resolutions', controller.resolutions);
router.get('/tasks.statuses', controller.statuses);
router.post('/tasks.update', controller.update);


// CONSTRUCTOR
module.exports = router;