// REQUIRES
const express = require('express');

const controller = require('./controller');
const { multer } = require('../../utilities');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/attachments.create', multer('attachments').any(), controller.create);
router.post('/attachments.delete', controller.delete);
router.get('/attachments.info', controller.info);
router.get('/attachments.list', controller.list);
router.post('/attachments.update', controller.update);


// CONSTRUCTOR
module.exports = router;