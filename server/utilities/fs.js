// REQUIRES
const fs = require('fs');
const path = require('path');

const string = require('./string');


// PUBLIC METHODS
module.exports.access = function(file, mode) {
  return new Promise((resolve, reject) => fs.access(file, mode, (err) => (err ? reject(err) : resolve(file))));
};

module.exports.exists = function(file, mode) {
  return new Promise((resolve) => fs.access(file, mode, (err) => resolve(!err)));
};

module.exports.mkdirp = function(file) {
  return new Promise((resolve, reject) => fs.mkdir(file, { recursive: true }, (err) => (err ? reject(err) : resolve())));
};

module.exports.readFile = function(file, options) {
  return new Promise((resolve, reject) => fs.readFile(file, options, (err, data) => (err ? reject(err) : resolve(data))));
};

module.exports.rename = function(oldFile, newFile) {
  return new Promise((resolve, reject) => fs.rename(oldFile, newFile, (err) => (err ? reject(err) : resolve())));
};

module.exports.writeFile = function(file, data) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path.dirname(file), { recursive: true },
      (err1) => (err1 ? reject(err1) : fs.writeFile(file, string.trim(data, '\n'), (err2) => (err2 ? reject(err2) : resolve()))));
  });
};

module.exports.unlink = function(file) {
  return new Promise((resolve, reject) => fs.unlink(file, (err) => (err ? reject(err) : resolve())));
};