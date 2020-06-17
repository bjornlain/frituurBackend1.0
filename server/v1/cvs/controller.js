// REQUIRES
const config = require('../../config');
const { canAccessOwnEntity, deleteLinkedModels, logger, query, trycatch } = require('../../utilities');
const { Cv } = require('../../models');

// PUBLIC METHODS
module.exports.create = trycatch(async ({ body, owned, user }, res) => {
  if (!canAccessOwnEntity(owned, user, body.owner)) {
    return res.status(403).end();
  }

  const cv = await Cv.create(body);
  return res.status(201).json(cv);
});

module.exports.delete = trycatch(async ({ body, owned, user }, res) => {
  if (!body.id) {
    return res.status(400).end();
  }

  const cv = await Cv
    .findOne({ _id: body.id, deleted: false })
    .populate('owner', 'avatar name')
    .lean();

  if (!cv) {
    return res.status(404).end();
  }

  if (!canAccessOwnEntity(owned, user, cv.owner)) {
    return res.status(403).end();
  }

  if (body.force) {
    await Cv.findOneAndDelete({ _id: body.id });
    try {
      await deleteLinkedModels(body.id, true);
    } catch (e) {
      logger.error(`Unable to hard delete linked models with parent id: ${body.id}`);
    }
  } else {
    await Cv.findOneAndUpdate({ _id: body.id, deleted: false }, { deleted: true });

    try {
      await deleteLinkedModels(body.id);
    } catch (error) {
      await Cv.findOneAndUpdate({ _id: body.id, deleted: true }, { deleted: false });
      return res.status(500).end();
    }
  }

  return res.status(204).end();
});

module.exports.info = trycatch(async ({ owned, user, query: reqQuery }, res) => {
  if (!reqQuery || !reqQuery.id) {
    return res.status(400).end();
  }

  const cv = await Cv
    .findOne({ _id: reqQuery.id, deleted: false })
    .populate('owner', 'avatar name')
    .lean();

  if (!cv) {
    return res.status(404).end();
  }

  if (!canAccessOwnEntity(owned, user, cv.owner)) {
    return res.status(403).end();
  }

  return res.json(cv);
});

module.exports.list = trycatch(async (req, res) => {
  const { query: { sort = 'title', skip = 0, limit: limitRaw } } = req;
  const limit = +limitRaw < config.settings.page_limit ? +limitRaw : config.settings.page_limit;

  const cvs = await Cv
    .find(query.where(req, { deleted: false }, 'title'))
    .populate('owner', 'avatar name')
    .sort(sort)
    .skip(+skip)
    .limit(limit)
    .lean();

  return res.json(cvs);
});

module.exports.update = trycatch(async ({ body, owned, user }, res) => {
  if (!body.id) {
    return res.status(400).end();
  }

  const cv = await Cv
    .findOne({ _id: body.id, deleted: false })
    .populate('owner', 'avatar name')
    .lean();

  if (!cv) {
    return res.status(404).end();
  }

  if (!canAccessOwnEntity(owned, user, cv.owner)) {
    return res.status(403).end();
  }

  const updatedCv = await Cv.findOneAndUpdate({ _id: body.id, deleted: false }, body, { new: true });

  return res.json(updatedCv);
});