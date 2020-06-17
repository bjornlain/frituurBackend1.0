// REQUIRES
const { Comment } = require('../../models');
const config = require('../../config');
const { canAccesOwnLinkedEntity, deleteLinkedModels, query, trycatch } = require('../../utilities');


// PUBLIC METHODS
module.exports.create = trycatch(async ({ body, owned, user }, res) => {
  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, body);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const comment = await Comment.create(body);
  await comment.populate('author', 'avatar name').execPopulate();
  return res.status(201).json(comment);
});

module.exports.delete = trycatch(async ({ owned, user, body }, res) => {
  if (!body.id) return res.status(400).end();

  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, body);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const comment = await Comment.findOneAndUpdate({
    _id: body.id,
    deleted: false,
  }, { deleted: true });

  try {
    // try to delete linked attachments and comments
    await deleteLinkedModels(body.id);
  } catch (error) {
    await Comment.findOneAndUpdate({ _id: body.id, deleted: true }, { deleted: false });
    return res.status(500).end();
  }

  return res.status(comment ? 204 : 404).end();
});

module.exports.info = trycatch(async ({ owned, user, query: reqQuery }, res) => {
  if (!reqQuery.id) return res.status(400).end();

  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, reqQuery);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const comment = await Comment
    .findOne({
      _id: reqQuery.id,
      deleted: false,
    })
    .populate('author', 'avatar name')
    .lean();
  if (!comment) return res.status(404).end();
  return res.json(comment);
});

module.exports.list = trycatch(async (req, res) => {
  const comments = await Comment
    .find(query.where(req, { deleted: false }))
    .populate('author', 'avatar name')
    .sort(req.query.sort || 'created')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(comments);
});

module.exports.statuses = function(req, res) {
  return res.json(Comment.statuses);
};

module.exports.update = trycatch(async ({ body, owned, user }, res) => {
  if (!body.id) return res.status(400).end();

  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, body);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const comment = await Comment
    .findOneAndUpdate({
      _id: body.id,
      deleted: false,
    }, body, { new: true })
    .populate('author', 'avatar name');
  if (!comment) return res.status(404).end();
  return res.json(comment);
});