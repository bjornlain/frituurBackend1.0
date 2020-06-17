const config = require('../config');
const { canAccessOwnEntity, deleteLinkedModels, query, trycatch } = require('../utilities');

module.exports = ({ entityModel, defaultSortFields, searchableFields, populate }) => {
  const createHandler = trycatch(async ({ body, owned, user }, res) => {
    if (!canAccessOwnEntity(owned, user, body.owner)) {
      return res.status(403).end();
    }

    const createdModel = await entityModel.create(body);

    return res.status(201).json(createdModel);
  });

  const deleteHandler = trycatch(async ({ body, owned, user }, res) => {
    if (!body.id) return res.status(400).end();
    const model = await entityModel
      .findOne({ _id: body.id, deleted: false })
      .populate('owner', 'avatar name')
      .lean();
    if (!model) return res.status(404).end();

    if (!canAccessOwnEntity(owned, user, model.owner)) {
      return res.status(403).end();
    }

    if (body.force) {
      await entityModel.findOneAndDelete({ _id: body.id });
      return res.status(204).end();
    }

    await entityModel.findOneAndUpdate({ _id: body.id, deleted: false }, { deleted: true });

    try {
      // try to delete linked models (like attachments, comments, ...)
      await deleteLinkedModels(body.id);
    } catch (error) {
      await entityModel.findOneAndUpdate({ _id: body.id, deleted: true }, { deleted: false });
      return res.status(500).end();
    }

    return res.status(204).end();
  });

  const infoHandler = trycatch(async ({ owned, user, query: reqQuery }, res) => {
    if (!reqQuery || !reqQuery.id) {
      return res.status(400).end();
    }

    const model = await entityModel
      .findOne({ _id: reqQuery.id, deleted: false })
      .populate(populate.entity, populate.fields)
      .lean();

    if (!model) {
      return res.status(404).end();
    }

    if (!canAccessOwnEntity(owned, user, model.owner)) {
      return res.status(403).end();
    }

    return res.json(model);
  });

  const listHandler = trycatch(async (req, res) => {
    const { query: { sort = defaultSortFields, skip = 0, limit: limitRaw } } = req;
    const limit = +limitRaw < config.settings.page_limit ? +limitRaw : config.settings.page_limit;


    const modelList = await entityModel
      .find(query.where(req, { deleted: false }, searchableFields))
      .sort(sort)
      .populate(populate.entity, populate.fields)
      .skip(+skip)
      .limit(limit)
      .lean();

    return res.json(modelList);
  });

  const updateHandler = trycatch(async ({ body, owned, user }, res) => {
    if (!body.id) {
      return res.status(400).end();
    }

    const asset = await entityModel
      .findOne({ _id: body.id, deleted: false })
      .populate(populate.entity, populate.fields)
      .lean();

    if (!asset) {
      return res.status(404).end();
    }

    if (!canAccessOwnEntity(owned, user, asset.owner)) {
      return res.status(403).end();
    }

    const updatedModel = await entityModel.findOneAndUpdate({ _id: body.id, deleted: false }, body, { new: true });

    return res.json(updatedModel);
  });

  return {
    create: createHandler,
    delete: deleteHandler,
    info: infoHandler,
    list: listHandler,
    update: updateHandler,
  };
};