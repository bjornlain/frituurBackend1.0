// REQUIRES
const { Contract } = require('../../models');
const { canAccessOwnEntity, deleteLinkedModels, query, trycatch } = require('../../utilities');
const config = require('../../config');

// PUBLIC METHODS
module.exports.create = trycatch(async ({ body, owned, user }, res) => {
  if (!canAccessOwnEntity(owned, user, body.owner)) {
    return res.status(403).end();
  }

  const contract = await Contract.create(body);
  return res.status(201).json(contract);
});

module.exports.delete = trycatch(async ({ body, owned, user }, res) => {
  if (!body.id) return res.status(400).end();

  const contract = await Contract
    .findOne({ _id: body.id, deleted: false })
    .populate('owner')
    .lean();

  if (!contract) {
    return res.status(404).end();
  }

  if (!canAccessOwnEntity(owned, user, contract.owner)) {
    return res.status(403).end();
  }

  await Contract.findOneAndUpdate({ _id: body.id, deleted: false }, { deleted: true });

  try {
    // try to delete linked attachments and comments
    await deleteLinkedModels(body.id);
  } catch (error) {
    await Contract.findOneAndUpdate({ _id: body.id, deleted: true }, { deleted: false });
    return res.status(500).end();
  }

  return res.status(204).end();
});

module.exports.info = trycatch(async ({ owned, user, query: reqQuery }, res) => {
  if (!reqQuery.id) return res.status(400).end();

  const contract = await Contract
    .findOne({
      _id: reqQuery.id,
      deleted: false,
    })
    .populate('owner', { path: 'contracts.signatures.signer' })
    .lean();

  if (!contract) return res.status(404).end();

  if (!canAccessOwnEntity(owned, user, contract.owner)) {
    return res.status(403).end();
  }

  return res.json(contract);
});

module.exports.list = trycatch(async (req, res) => {
  const contracts = await Contract
    .find(query.where(req, { deleted: false }, 'name'))
    .populate('owner', { path: 'contracts.signatures.signer' })
    .sort(req.query.sort || 'name')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(contracts);
});

module.exports.update = trycatch(async ({ body, owned, user }, res) => {
  if (!body.id) return res.status(400).end();

  const contract = await Contract
    .findOne({ _id: body.id, deleted: false })
    .populate('owner', 'avatar name')
    .lean();

  if (!contract) return res.status(404).end();

  if (!canAccessOwnEntity(owned, user, contract.owner)) {
    return res.status(403).end();
  }

  const updatedContract = await Contract.findOneAndUpdate({ _id: body.id, deleted: false }, body, { new: true });

  return res.json(updatedContract);
});