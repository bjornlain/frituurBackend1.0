// REQUIRES
const express = require('express');

const { accesscontrol, passport, response } = require('../middleware');


const roles = require('./roles');

const users = require('./users');
const frituren = require('./frituren');
const auth = require('./auth');

// PRIVATE PROPERTIES
const router = express.Router();


// MIDDLEWARE
router.use(passport);
router.use(accesscontrol);
router.use(response);


// ROUTES

router.use(frituren);
router.use(auth);
router.use(roles);
router.use(users);


// CONSTRUCTOR
module.exports = router;