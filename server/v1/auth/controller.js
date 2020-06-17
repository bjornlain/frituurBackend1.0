// REQUIRES
const zxcvbn = require('zxcvbn');

const { mailer, random } = require('../../utilities');
const { User } = require('../../models');


// PUBLIC METHODS
module.exports.forgot = async function(req, res) {
  if (!req.body.email) return res.status(400).end();
  let user = await User.findOne({ email: new RegExp(`^${req.body.email}$`, 'i') });
  if (!user || user.deleted || !user.isApproved()) return res.status(401).end();
  user.security_date = new Date().valueOf() + 60 * 60 * 1000;
  user.security_token = random(64);
  user = await user.save();
  const info = await mailer.send('forgot', user, { token: user.security_token });
  if (info && info.accepted.length) return res.status(204).end();
  user.security_date = undefined;
  user.security_token = undefined;
  await user.save();
  return res.status(500).end();
};

module.exports.invite = async function(req, res) {
  const user = await User.findOne({ security_date: { $gt: new Date() }, security_token: req.body.token });
  if (!user || user.deleted || !user.isApproved()) return res.status(401).end();
  return res.json(user);
};

module.exports.login = async function(req, res) {
  console.log(req.body);
  if (!req.body.email || !req.body.password) return res.status(400).end();
  const user = await User.findOne({ email: new RegExp(`^${req.body.email}$`, 'i') }).select('+password');
  if (!user || user.deleted || !user.isApproved() || !(await user.verifyPassword(req.body.password))) return res.status(401).end();
  return res.json(await user.toJWT());
};

module.exports.refresh = async function(req, res) {
  if (!req.body.id || !req.body.token) return res.status(400).end();
  const user = await User.findOne({ _id: req.body.id, refresh_token: req.body.token });
  if (!user || user.deleted || !user.isApproved()) return res.status(401).end();
  return res.json(await user.toJWT());
};

module.exports.reset = async function(req, res) {
  if (!req.body.password || zxcvbn(req.body.password).score < 3 || !req.body.token) return res.status(400).end();
  let user = await User.findOne({ security_date: { $gt: new Date() }, security_token: req.body.token });
  if (!user || user.deleted || !user.isApproved()) return res.status(401).end();
  user.password = req.body.password;
  user.security_date = undefined;
  user.security_token = undefined;
  user = await user.save();
  await mailer.send('reset', user);
  return res.status(204).end();
};