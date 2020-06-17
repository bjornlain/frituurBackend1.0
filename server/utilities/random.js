// REQUIRES
const crypto = require('crypto');


// PRIVATE PROPERTIES
const defaults = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';


// CONSTRUCTOR
module.exports = function(length, characters = defaults) {
  const bytes = crypto.randomBytes(length);
  const result = new Array(length);
  for (let i = 0; i < length; i += 1) {
    result[i] = characters[bytes[i] % characters.length];
  }
  return result.join('');
};