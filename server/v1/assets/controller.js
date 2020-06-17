// REQUIRES
const { Asset } = require('../../models');
const BaseController = require('../baseController');

const assetController = BaseController({
  entityModel: Asset,
  defaultSortFields: 'last_name first_name',
  searchableFields: 'category description name serial_number vendor',
  populate: {
    entity: 'owner',
    fields: 'avatar first_name',
  },
});

module.exports = {
  ...assetController,
};