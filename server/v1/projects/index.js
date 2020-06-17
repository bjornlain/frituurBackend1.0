// REQUIRES
const express = require('express');

const controller = require('./controller');
const { multer } = require('../../utilities');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.post('/projects.avatar', multer('avatars').single('file'), controller.avatar);
router.get('/projects.categories', controller.categories);
router.post('/projects.create', controller.create);
router.post('/projects.delete', controller.delete);
router.get('/projects.info', controller.info);
router.get('/projects.list', controller.list);
router.get('/projects.kinds', controller.kinds);
router.post('/projects.update', controller.update);


// CONSTRUCTOR
module.exports = router;