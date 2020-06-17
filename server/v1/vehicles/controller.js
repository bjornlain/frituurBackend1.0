// REQUIRES
const BaseController = require('../baseController');
const { trycatch } = require('../../utilities');
const { Vehicle } = require('../../models');

const vehiclesController = BaseController({
  entityModel: Vehicle,
  defaultSortFields: 'plate brand',
  searchableFields: 'brand color model',
  populate: {
    entity: 'owner',
    fields: 'avatar first_name',
  },
});

// PUBLIC METHODS OVERWRITES
const brandsHandler = trycatch(async (req, res) => {
  const modelList = await Vehicle.distinct('brand');

  return res.json(modelList.sort());
});

module.exports = {
  ...vehiclesController,
  brands: brandsHandler,
};