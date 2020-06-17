// REQUIRES
const nodemailer = require('nodemailer');
const path = require('path');

const config = require('../config');
const fs = require('./fs');


// PRIVATE PROPERTIES
const transporter = nodemailer.createTransport(config.nodemailer.transporter);


// PUBLIC METHODS
module.exports.send = async function(template, user, parameters = {}) {
  const file = path.resolve(config.paths.mail, `${template}.html`);
  let html = await fs.readFile(file, 'utf-8');
  const params = Object.assign(config.nodemailer.parameters, parameters);
  Object.keys(params).forEach((key) => { html = html.replace(new RegExp(`{{\\s?${key}\\s?}}`, 'gi'), params[key]); });
  const subject = html.match(/<title>(.*?)<\/title>/i)[1];
  const message = Object.assign(config.nodemailer.message, { html, subject, to: user.toEmail() });
  try { return await transporter.sendMail(message); } catch (err) { return err; }
};