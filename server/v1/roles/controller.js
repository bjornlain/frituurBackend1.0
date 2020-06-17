// REQUIRES
const mongoose = require('mongoose');

const config = require('../../config');
const { query, trycatch } = require('../../utilities');
const { Role } = require('../../models');


// PUBLIC METHODS
module.exports.create = trycatch(async (req, res) => {
  const role = await Role.create(req.body);
  return res.status(201).json(role);
});

module.exports.delete = trycatch(async (req, res) => {
  if (!req.body.id) return res.status(400).end();
  const role = await Role.findOneAndUpdate({ _id: req.body.id, deleted: false }, { deleted: true });
  return res.status(role ? 204 : 404).end();
});

module.exports.info = trycatch(async (req, res) => {
  if (!req.query.id) return res.status(400).end();
  const key = mongoose.Types.ObjectId.isValid(req.query.id) ? '_id' : 'name';
  const role = await Role.findOne({ [key]: req.query.id, deleted: false }).lean();
  if (!role) return res.status(404).end();
  return res.json(role);
});

module.exports.list = trycatch(async (req, res) => {
  const roles = await Role
    .find(query.where(req, { deleted: false }, 'name'))
    .sort(req.query.sort || 'name')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(roles);
});

module.exports.update = trycatch(async (req, res) => {
  if (!req.body.id) return res.status(400).end();
  const role = await Role.findOneAndUpdate({ _id: req.body.id, deleted: false }, req.body, { new: true });
  if (!role) return res.status(404).end();
  return res.json(role);
});