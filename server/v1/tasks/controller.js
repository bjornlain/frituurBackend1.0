// REQUIRES
const mongoose = require('mongoose');

const config = require('../../config');
const { Task } = require('../../models');
const { deleteLinkedModels, query, trycatch } = require('../../utilities');


// PUBLIC METHODS
module.exports.create = trycatch(async (req, res) => {
  const task = await Task.create(JSON.parse(req.body.body));
  await task
    .populate('project', 'avatar key name')
    .execPopulate();
  return res.status(201).json(task);
});

module.exports.delete = trycatch(async ({ body }, res) => {
  if (!body.id) return res.status(400).end();

  const task = await Task
    .findOne({ _id: body.id, deleted: false })
    .populate('owner')
    .lean();

  if (!task) {
    return res.status(404).end();
  }

  await Task.findOneAndUpdate({ _id: body.id, deleted: false }, { deleted: true });

  try {
    // try to delete linked attachments and comments
    await deleteLinkedModels(body.id);
  } catch (error) {
    await Task.findOneAndUpdate({ _id: body.id, deleted: true }, { deleted: false });
    return res.status(500).end();
  }

  return res.status(204).end();
});

module.exports.info = trycatch(async (req, res) => {
  if (!req.query.id) return res.status(400).end();
  const key = mongoose.Types.ObjectId.isValid(req.query.id) ? '_id' : 'key';
  const task = await Task
    .findOne({ [key]: req.query.id, deleted: false })
    .populate('assignee reporter', 'avatar name')
    .populate('project', 'avatar key name')
    .lean();
  if (!task) return res.status(404).end();
  return res.json(task);
});

module.exports.list = trycatch(async (req, res) => {
  const tasks = await Task
    .find(query.where(req, { deleted: false }))
    .populate('assignee reporter', 'avatar name')
    .populate('project', 'avatar key name')
    .select('key summary type')
    .sort(req.query.sort || 'created')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(tasks);
});

module.exports.priorities = function(req, res) {
  return res.json(Task.priorities);
};

module.exports.resolutions = function(req, res) {
  return res.json(Task.resolutions);
};

module.exports.statuses = function(req, res) {
  return res.json(Task.statuses);
};

module.exports.kinds = trycatch(async (req, res) => {
  if (!req.query.project) return res.json(Task.kinds);
  const count = await Task.count(query.where(req, { deleted: false, kind: 'task' }));
  return res.json(count > 0 ? Task.kinds : Task.kinds.filter((kind) => kind !== 'sub-task'));
});

module.exports.update = trycatch(async (req, res) => {
  if (!req.body.id) return res.status(400).end();
  const task = await Task
    .findOneAndUpdate({ _id: req.body.id, deleted: false }, req.body, { new: true })
    .populate('assignee reporter', 'avatar name')
    .populate('project', 'avatar key name');
  if (!task) return res.status(404).end();
  return res.json(task);
});
