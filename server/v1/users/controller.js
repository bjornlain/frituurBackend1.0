// REQUIRES
const path = require('path');
const sharp = require('sharp');

const config = require('../../config');
const { fs, mailer, query, random, trycatch } = require('../../utilities');
const { User } = require('../../models');


// PUBLIC METHODS
module.exports.avatar = trycatch(async (req, res) => {
  if ((!req.owned && !req.body.id) || !req.file || !req.file.size) return res.status(400).end();
  let user = req.owned ? req.user : await User.findOne({ _id: req.body.id, deleted: false });
  if (!user) return res.status(404).end();
  const fileName = `${req.file.filename}${path.extname(req.file.originalname)}`;
  await sharp(req.file.path).resize(config.settings.avatar_size, config.settings.avatar_size).crop().toFile(path.resolve(config.paths.avatar, fileName));
  await fs.unlink(req.file.path);
  user.avatar = fileName;
  user = await user.save();
  return res.json(user);
});

module.exports.create = trycatch(async (req, res) => {
  let user = new User();
  Object.assign(user, req.body);
  user.securityDate = new Date().valueOf() + 7 * 24 * 60 * 60 * 1000;
  user.securityToken = random(64);
  user = await user.save();
  if (!req.body.invite) return res.json(user);
  const info = await mailer.send('invite', user, { token: user.security_token });
  if (info && info.accepted.length) return res.json(user);
  await User.findByIdAndRemove(user._id);
  return res.status(500).end();
});

module.exports.delete = trycatch(async (req, res) => {
  if (!req.body.id) return res.status(400).end();

  let user;
  if (req.body.force) {
    user = await User.findOneAndDelete({ _id: req.body.id });
  } else {
    user = await User.findOneAndUpdate({ _id: req.body.id, deleted: false }, { deleted: true });
  }

  return res.status(user ? 204 : 404).end();
});

module.exports.info = trycatch(async (req, res) => {
  if (req.owned) return res.json(req.user);
  if (!req.query.id) return res.status(400).end();
  const user = await User.findOne({ _id: req.query.id, deleted: false }).lean();
  if (!user) return res.status(404).end();
  return res.json(user);
});

module.exports.list = trycatch(async (req, res) => {
  const users = await User
    .find(query.where(req, { deleted: false }, 'email name'))
    .sort(req.query.sort || 'name')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(users);
});

module.exports.update = trycatch(async (req, res) => {
  if (!req.owned && !req.query.id) return res.status(400).end();
  let user = req.owned ? req.user : await User.findOne({ _id: req.query.id, deleted: false });
  if (!user) return res.status(404).end();
  Object.assign(user, req.body);
  user = await user.save();
  return res.json(user);
});