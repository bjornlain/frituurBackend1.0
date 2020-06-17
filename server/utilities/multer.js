// REQUIRES
const multer = require('multer');

const config = require('../config');


// CONSTRUCTOR
module.exports = function(type) {
  return multer({
    dest: config.paths.temporary,
    fileFilter: (req, file, next) => next(false, config.multer[type].mimeTypes.includes(file.mimetype)),
    limits: config.multer[type].limits,
  });
};