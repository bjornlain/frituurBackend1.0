// REQUIRES
const BaseController = require('../baseController');
const { Incident } = require('../../models');

const incidentsController = BaseController({
  entityModel: Incident,
  defaultSortFields: 'date',
  searchableFields: 'date first_name last_name title description',
  populate: {
    entity: 'owner',
    fields: 'avatar first_name last_name',
  },
});

module.exports = {
  ...incidentsController,
};