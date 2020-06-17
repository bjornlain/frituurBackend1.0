// REQUIRES
const mongoose = require('mongoose');
const path = require('path');
const sharp = require('sharp');

const config = require('../../config');
const { deleteLinkedModels, fs, query, trycatch } = require('../../utilities');
const { Project } = require('../../models');


// PUBLIC METHODS
module.exports.avatar = trycatch(async (req, res) => {
  if (!req.body.id || !req.file || !req.file.size) return res.status(400).end();
  const key = mongoose.Types.ObjectId.isValid(req.body.id) ? '_id' : 'key';
  let project = await Project
    .findOne({ [key]: req.body.id, deleted: false })
    .populate('lead', 'avatar name');
  if (!project) return res.status(404).end();
  const fileName = `${req.file.filename}${path.extname(req.file.originalname)}`;
  await sharp(req.file.path).resize(config.settings.avatar_size, config.settings.avatar_size).crop().toFile(path.resolve(config.paths.avatars, fileName));
  await fs.unlink(req.file.path);
  project.avatar = fileName;
  project = await project.save();
  return res.json(project);
});

module.exports.categories = trycatch(async (req, res) => {
  const categories = await Project.distinct('category').lean();
  return res.json(categories);
});

module.exports.create = trycatch(async (req, res) => {
  const project = await Project.create(req.body);
  await project.populate('lead', 'avatar name').execPopulate();
  return res.status(201).json(project);
});

module.exports.delete = trycatch(async ({ body }, res) => {
  if (!body.id) return res.status(400).end();

  const project = await Project
    .findOne({ _id: body.id, deleted: false })
    .populate('owner')
    .lean();

  if (!project) {
    return res.status(404).end();
  }

  await Project.findOneAndUpdate({ _id: body.id, deleted: false }, { deleted: true });

  try {
    // try to delete linked attachments and comments
    await deleteLinkedModels(body.id);
  } catch (error) {
    await Project.findOneAndUpdate({ _id: body.id, deleted: true }, { deleted: false });
    return res.status(500).end();
  }

  return res.status(204).end();
});

module.exports.info = trycatch(async (req, res) => {
  if (!req.query.id) return res.status(400).end();
  const key = mongoose.Types.ObjectId.isValid(req.query.id) ? '_id' : 'key';
  const project = await Project
    .findOne({ [key]: req.query.id, deleted: false })
    .populate('lead', 'avatar name')
    .lean();
  if (!project) return res.status(404).end();
  return res.json(project);
});

module.exports.list = trycatch(async (req, res) => {
  console.log(req);
  const projects = await Project
    .find(query.where(req, { deleted: false }))
    .select('-description')
    .sort(req.query.sort || 'name')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(projects);
});

module.exports.kinds = trycatch((req, res) => res.json(Project.kinds));

module.exports.update = trycatch(async (req, res) => {
  if (!req.body.id) return res.status(400).end();
  const project = await Project
    .findOneAndUpdate({ _id: req.body.id, deleted: false }, req.body, { new: true })
    .populate('lead', 'avatar name');
  if (!project) return res.status(404).end();
  return res.json(project);
});
