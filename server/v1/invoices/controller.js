// REQUIRES
const config = require('../../config');
const { deleteLinkedModels, query, trycatch } = require('../../utilities');
const { Invoice } = require('../../models');

// PUBLIC METHODS
module.exports.create = trycatch(async ({ body }, res) => {
  const invoice = await Invoice.create(body);
  return res.status(201).json(invoice);
});

module.exports.delete = trycatch(async ({ body }, res) => {
  if (!body.id) {
    return res.status(400).end();
  }

  const invoice = await Invoice
    .findOne({ _id: body.id, deleted: false })
    .lean();

  if (!invoice) {
    return res.status(404).end();
  }

  await Invoice.findOneAndUpdate({ _id: body.id, deleted: false }, { deleted: true });

  try {
    // try to delete linked attachments and comments
    await deleteLinkedModels(body.id);
  } catch (error) {
    await Invoice.findOneAndUpdate({ _id: body.id, deleted: true }, { deleted: false });
    return res.status(500).end();
  }

  return res.status(204).end();
});

module.exports.info = trycatch(async ({ query: reqQuery }, res) => {
  if (!reqQuery || !reqQuery.id) {
    return res.status(400).end();
  }

  const invoice = await Invoice
    .findOne({ _id: reqQuery.id, deleted: false })
    .populate('client', 'name')
    .lean();

  if (!invoice) {
    return res.status(404).end();
  }

  return res.json(invoice);
});

module.exports.vatPercentages = trycatch((req, res) => res.json(Invoice.vatPercentages));

module.exports.list = trycatch(async (req, res) => {
  const { query: { sort = 'name', skip = 0, limit: limitRaw } } = req;
  const limit = +limitRaw < config.settings.page_limit ? +limitRaw : config.settings.page_limit;

  const invoices = await Invoice
    .find(query.where(req, { deleted: false }, 'date number client'))
    .sort(sort)
    .skip(+skip)
    .limit(limit)
    .populate('client', 'name')
    .lean();

  return res.json(invoices);
});

module.exports.update = trycatch(async ({ body }, res) => {
  if (!body.id) {
    return res.status(400).end();
  }

  const invoice = await Invoice
    .findOne({ _id: body.id, deleted: false })
    .lean();

  if (!invoice) {
    return res.status(404).end();
  }

  const updatedInvoice = await Invoice
    .findOneAndUpdate({ _id: body.id, deleted: false }, body, { new: true })
    .populate('client', 'name');

  return res.json(updatedInvoice);
});