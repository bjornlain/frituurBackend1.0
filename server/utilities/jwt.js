// REQUIRES
const jwt = require('jsonwebtoken');

const config = require('../config');


// PUBLIC METHODS
module.exports.sign = function(obj) {
  return jwt.sign(obj, config.jwt.secret, { expiresIn: config.jwt.expires_in, issuer: config.jwt.issuer });
};

module.exports.verify = function(token) {
  return new Promise((resolve, reject) => jwt.verify(token, config.jwt.secret, (err, payload) => (err ? reject(err, payload) : resolve(payload))));
};