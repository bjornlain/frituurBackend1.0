const mailer = require('./mailer');
const trycatch = require('../trycatch');
const canAccessOwnEntity = require('../canAccessOwnEntity');
const canAccesOwnLinkedEntity = require('../canAccesOwnLinkedEntity');

module.exports.clone = jest.fn();
module.exports.date = jest.fn();
module.exports.fs = { rename: jest.fn() };
module.exports.jwt = jest.fn();
module.exports.mailer = mailer;
module.exports.multer = jest.fn();
module.exports.query = { where: () => jest.fn() };
module.exports.random = jest.fn();
module.exports.deleteLinkedModels = jest.fn();
module.exports.trycatch = trycatch;
module.exports.canAccessOwnEntity = canAccessOwnEntity;
module.exports.canAccesOwnLinkedEntity = canAccesOwnLinkedEntity;