// REQUIRES
const moment = require('moment');
const config = require('../../config');
const { dates, query, trycatch } = require('../../utilities');
const { Frituur} = require('../../models');


// PUBLIC METHODS
module.exports.create = trycatch(async (req, res) => {
  const frituren = [];
  console.log(req.body);
  const frituurCreate = await Frituur.create(JSON.parse(req.body));
  console.log(frituurCreate);
  frituren.push(await Frituur.create(Object.assign(req.body)));
  console.log('populate task');
  await Promise.all(frituren.map(async (frituur) => {
    await frituur
      .populate('task')
      .populate('user')
      .execPopulate();
  }));
  return res.status(201).json(frituren);
});

module.exports.delete = trycatch(async (req, res) => {
  console.log(JSON.parse(req.body));
  if (!req.body) return res.status(400).end();
  const frituur = await Frituur.findOneAndUpdate({ _id: JSON.parse(req.body)});
  return res.status(frituur ? 204 : 404).end();
});


module.exports.list = trycatch(async (req, res) => {
  const frituren = await Frituur
    /* how to query =     .find(query.where(req, { deleted: false })) */
    .find(query.where(req))
    .populate('task', 'key summary')
    .populate('user', 'avatar name')
    .sort(req.query.sort || 'created')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(frituren);
});

module.exports.update = trycatch(async (req, res) => {
  const frit = JSON.parse(req.body);
  console.log(frit);
  if (!frit.id) return res.status(400).end();
  const frituur = await Frituur
    .findOneAndUpdate({ _id: frit.id }, frit, { new: true })
    .populate('task')
    .populate('user');
  if (!frituur) return res.status(404).end();
  return res.json(frituur);
});