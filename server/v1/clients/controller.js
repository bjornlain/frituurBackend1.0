// REQUIRES
const config = require('../../config');
const { deleteLinkedModels, query, trycatch } = require('../../utilities');
const { Client } = require('../../models');

// PUBLIC METHODS
module.exports.create = trycatch(async ({ body }, res) => {
  const client = await Client.create(body);
  return res.status(201).json(client);
});

module.exports.delete = trycatch(async ({ body }, res) => {
  if (!body.id) {
    return res.status(400).end();
  }

  const client = await Client
    .findOne({ _id: body.id, deleted: false })
    .lean();

  if (!client) {
    return res.status(404).end();
  }

  await Client.findOneAndUpdate({ _id: body.id, deleted: false }, { deleted: true });

  try {
    // try to delete linked attachments and comments
    await deleteLinkedModels(body.id);
  } catch (error) {
    await Client.findOneAndUpdate({ _id: body.id, deleted: true }, { deleted: false });
    return res.status(500).end();
  }

  return res.status(204).end();
});

module.exports.info = trycatch(async ({ query: reqQuery }, res) => {
  if (!reqQuery || !reqQuery.id) {
    return res.status(400).end();
  }

  const client = await Client
    .findOne({ _id: reqQuery.id, deleted: false })
    .lean();

  if (!client) {
    return res.status(404).end();
  }

  return res.json(client);
});

module.exports.kinds = trycatch((req, res) => res.json(Client.kinds));

module.exports.list = trycatch(async (req, res) => {
  const { query: { sort = 'name', skip = 0, limit: limitRaw } } = req;
  const limit = +limitRaw < config.settings.page_limit ? +limitRaw : config.settings.page_limit;

  const clients = await Client
    .find(query.where(req, { deleted: false }, 'name phone email vat_number address kind'))
    .sort(sort)
    .skip(+skip)
    .limit(limit)
    .lean();

  return res.json(clients);
});

module.exports.update = trycatch(async ({ body }, res) => {
  if (!body.id) {
    return res.status(400).end();
  }

  const client = await Client
    .findOne({ _id: body.id, deleted: false })
    .lean();

  if (!client) {
    return res.status(404).end();
  }

  const updatedclient = await Client.findOneAndUpdate({ _id: body.id, deleted: false }, body, { new: true });

  return res.json(updatedclient);
});