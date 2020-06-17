// REQUIRES
const express = require('express');

const controller = require('./controller');
const { multer } = require('../../utilities');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/users.avatar', multer('avatars').single('file'), controller.avatar);
router.post('/users.create', controller.create);
router.post('/users.delete', controller.delete);
router.get('/users.info', controller.info);
router.get('/users.list', controller.list);
router.post('/users.update', controller.update);


// CONSTRUCTOR
module.exports = router;