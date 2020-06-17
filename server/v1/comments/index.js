// REQUIRES
const express = require('express');

const controller = require('./controller');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/comments.create', controller.create);
router.post('/comments.delete', controller.delete);
router.get('/comments.info', controller.info);
router.get('/comments.list', controller.list);
router.get('/comments.statuses', controller.statuses);
router.post('/comments.update', controller.update);


// CONSTRUCTOR
module.exports = router;