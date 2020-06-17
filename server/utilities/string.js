// PUBLIC METHODS
module.exports.capitalize = function(value) {
  return value.replace(/^\w/, (c) => c.toUpperCase());
};

module.exports.trim = function(value, char) {
  return value.replace(new RegExp(`^${char}+|${char}+$`, 'g'), '');
};