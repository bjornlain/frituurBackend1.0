// REQUIRES
const express = require('express');
const ui = require('swagger-ui-express');

const generator = require('./generator');


// PRIVATE PROPERTIES
const router = express.Router();


// ROUTES
router.get('/swagger.json', generator, (req, res) => res.json(req.swaggerDoc));

router.use('/swagger.ui', ui.serve);
router.get('/swagger.ui', generator, ui.setup());


// CONSTRUCTOR
module.exports = router;