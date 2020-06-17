// REQUIRES
const jsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const yaml = require('js-yaml');

const config = require('../../config');
const { fs, string, trycatch } = require('../../utilities');
const models = require('../../models');


// CONSTRUCTOR
module.exports = trycatch(async (req, res, next) => {
  await Promise.all(Object.entries(models).map(async ([name, model]) => {
    const enumerations = {};
    const schema = { components: { schemas: { [name]: m2s(name, model.schema.tree, enumerations), ...enumerations } } };
    await fs.writeFile(`./server/models/${name.toLowerCase()}.yaml`, yaml.dump(schema));
  }));
  req.swaggerDoc = jsdoc({ apis: ['./server/**/*.*'], definition: config.swagger });
  next();
});


// PRIVATE METHODS
function m2s(name, model, enumerations) {
  const result = { properties: {}, required: [] };
  Object.entries(model).forEach(([property, definition]) => {
    if (['created', 'id', 'updated', 'version'].includes(property)) return;
    if (typeof definition.select !== 'undefined' && !definition.select) return;
    if (definition instanceof mongoose.VirtualType) return;
    if (definition.required) result.required.push(property);
    result.properties[property] = m2d(name, property, definition, enumerations);
  });
  if (!result.required.length) delete result.required;
  return result;
}

function m2d(name, property, definition, enumerations) {
  let result;
  if (definition.type instanceof mongoose.Schema) {
    result = { type: 'array', items: { type: 'object', ...m2s(name, definition.type.tree, enumerations) } };
  } else if (Array.isArray(definition) && !definition[0].type) {
    result = { type: 'array', items: { type: 'object', ...m2s(name, definition[0], enumerations) } };
  } else if (Array.isArray(definition)) {
    result = { type: 'array', items: m2t(definition[0].type, definition[0].ref) };
  } else if (!definition.type) {
    result = { type: 'object', ...m2s(name, definition, enumerations) };
  } else if (Array.isArray(definition.type)) {
    result = { type: 'array', items: m2t(definition.type[0]) };
  } else if (definition.enum) {
    const pascal = property.split('_').map((s) => string.capitalize(s)).join('');
    enumerations[`${name}${pascal}`] = definition.enum; // eslint-disable-line no-param-reassign
    result = { $ref: `#/components/schemas/${name}${pascal}` };
  } else {
    result = m2t(definition.type, definition.ref);
  }
  return result;
}

function m2t(type, ref) {
  let result = {};
  if (type === Boolean) {
    result.type = 'boolean';
  } else if (type === Date) {
    result = { type: 'string', format: 'date' };
  } else if (type === Number) {
    result.type = 'number';
  } else if (type === String) {
    result.type = 'string';
  } else if (type === 'ObjectId') {
    result = { type: 'string', format: 'bson' };
  } else if (type.schemaName && type.schemaName === 'ObjectId' && ref) {
    result.$ref = `#/components/schemas/${ref}`;
  } else if (type.schemaName && type.schemaName === 'ObjectId') {
    result.type = 'string';
  } else {
    result.type = 'object';
  }
  return result;
}