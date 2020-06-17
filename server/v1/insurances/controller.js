// REQUIRES
const { Insurance } = require('../../models');
const config = require('../../config');
const { canAccesOwnLinkedEntity, deleteLinkedModels, query, trycatch } = require('../../utilities');

// PUBLIC METHODS
module.exports.create = trycatch(async ({ body, owned, user }, res) => {
  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, body);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const insurance = await Insurance.create(body);
  return res.status(201).json(insurance);
});

module.exports.delete = trycatch(async ({ owned, user, body }, res) => {
  if (!body.id) return res.status(400).end();

  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, body);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const insurance = await Insurance.findOneAndUpdate({
    _id: body.id,
    deleted: false,
  }, { deleted: true });

  try {
    // try to delete linked attachments and insurances
    await deleteLinkedModels(body.id);
  } catch (error) {
    await Insurance.findOneAndUpdate({ _id: body.id, deleted: true }, { deleted: false });
    return res.status(500).end();
  }

  return res.status(insurance ? 204 : 404).end();
});

module.exports.info = trycatch(async ({ owned, user, query: reqQuery }, res) => {
  if (!reqQuery.id) return res.status(400).end();

  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, reqQuery);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const insurance = await Insurance
    .findOne({
      _id: reqQuery.id,
      deleted: false,
    })
    .lean();
  if (!insurance) return res.status(404).end();
  return res.json(insurance);
});

module.exports.list = trycatch(async (req, res) => {
  const insurance = await Insurance
    .find(query.where(req, { deleted: false }))
    .sort(req.query.sort || 'created')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(insurance);
});

module.exports.update = trycatch(async ({ body, owned, user }, res) => {
  if (!body.id) return res.status(400).end();

  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, body);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const comment = await Insurance
    .findOneAndUpdate({
      _id: body.id,
      deleted: false,
    }, body, { new: true });

  if (!comment) return res.status(404).end();
  return res.json(comment);
});