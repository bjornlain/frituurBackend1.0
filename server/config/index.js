// REQUIRES
const base = require('./config.base.json');


// CONSTRUCTOR
module.exports = Object.assign(base, require(`./config.${process.env.NODE_ENV}.json`)); // eslint-disable-line import/no-dynamic-require