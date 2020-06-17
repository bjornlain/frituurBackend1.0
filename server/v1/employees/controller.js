// REQUIRES
const config = require('../../config');
const BaseController = require('../baseController');
const { query, trycatch } = require('../../utilities');
const { Employee } = require('../../models');

const employeesController = BaseController({
  entityModel: Employee,
  defaultSortFields: 'first_name last_name',
  searchableFields: 'first_name last_name',
  populate: {
    entity: 'manager',
    fields: 'avatar first_name',
  },
});

// PUBLIC METHOD OVERWRITES
const list = trycatch(async (req, res) => {
  const employees = await Employee
    .find(query.where(req, { deleted: false }, 'first_name last_name'))
    .select('avatar first_name last_name teams work_contact')
    .sort(req.query.sort || 'first_name last_name')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(employees);
});

module.exports = {
  ...employeesController,
  list,
};