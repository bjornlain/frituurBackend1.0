// REQUIRES
const AccessControl = require('accesscontrol');
const url = require('url');

const { clone } = require('../utilities');
const { Role } = require('../models');


// PRIVATE PROPERTIES
const methods = { DELETE: 'delete', GET: 'read', POST: 'create', PUT: 'update' };


// CONSTRUCTOR
module.exports = async function(req, res, next) {
  if (!Object.keys(methods).includes(req.method)) return res.status(400).end();
  const roles = await Role.find().lean();
  const grants = [].concat(...roles.map((item1) => item1.permissions.map((item2) => Object.assign(item2, { role: item1.name }))));
  const resource = url.parse(req.url).pathname.slice(1);
  const role = roles.find((item) => (req.user && req.user.role ? item._id.equals(req.user.role) : item.name === 'anonymous'));
  const ac = new AccessControl(grants);
  roles.filter((item) => item.extend).forEach((item) => ac.grant(item.name).extend(item.extend));
  const permission = ac.can(role.name)[`${methods[req.method]}Own`](resource);
  if (!permission.granted) return res.status(req.user ? 403 : 401).end();
  const possessions = getExtendedPermissions(role, roles)
    .filter((item) => item.action === methods[req.method] && item.resource === resource)
    .map((item) => item.possession);
  req.owned = possessions.length && !possessions.includes('any');
  if (req.body) req.body = permission.filter(req.body);
  const { json } = res;
  res.json = (obj) => {
    let result = obj;
    if (Array.isArray(obj) && obj.every((item) => typeof item === 'object')) result = permission.filter(clone(obj));
    json.call(res, result);
  };
  return next();
};


// PRIVATE METHODS
function getExtendedPermissions(role, roles) {
  const permissions = clone(role.permissions);
  if (!role.extend) return permissions;
  return permissions.concat(getExtendedPermissions(roles.find((item) => item.name === role.extend), roles));
}