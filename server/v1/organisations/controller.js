// REQUIRES
const config = require('../../config');
const { Organisation } = require('../../models');
const { query, trycatch } = require('../../utilities');

// PUBLIC METHODS
module.exports.create = trycatch(async (req, res) => {
  const organisation = await Organisation.create(req.body);
  return res.status(201).json(organisation);
});

module.exports.delete = trycatch(async (req, res) => {
  if (!req.body.id) return res.status(400).end();
  const organisation = await Organisation.findOneAndUpdate({ _id: req.body.id, deleted: false }, { deleted: true });
  return res.status(organisation ? 204 : 404).end();
});

module.exports.info = trycatch(async (req, res) => {
  if (!req.query.id) return res.status(400).end();
  const organisation = await Organisation
    .findOne({ _id: req.query.id, deleted: false })
    .lean();
  if (!organisation) return res.status(404).end();
  return res.json(organisation);
});

module.exports.list = trycatch(async (req, res) => {
  const organisations = await Organisation
    .find(query.where(req, { deleted: false }, 'name registration_number social_security_number'))
    .sort(req.query.sort || 'name')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(organisations);
});

module.exports.update = trycatch(async (req, res) => {
  if (!req.body.id) return res.status(400).end();
  const organisation = await Organisation.findOneAndUpdate({ _id: req.body.id, deleted: false }, req.body, { new: true });
  if (!organisation) return res.status(404).end();
  return res.json(organisation);
});