const canAccessOwnEntity = require('./canAccessOwnEntity');
const models = require('../models');

const modelsMap = Object.entries(models).reduce((mapAccumulator, [key, value]) => ({
  ...mapAccumulator,
  [key.toLowerCase()]: value,
}), {});

module.exports = async (owned, currentUser, { object_id: linkedModelId, object_type: linkedModelType }) => {
  if (!owned) {
    return true;
  }

  try {
    const entity = modelsMap[linkedModelType.toLowerCase()];

    if (!entity) {
      throw new Error('No model found for this entity');
    }

    const { owner } = await entity
      .findOne({ _id: linkedModelId, deleted: false }).lean();

    return canAccessOwnEntity(owned, currentUser, owner);
  } catch (error) {
    return false;
  }
};