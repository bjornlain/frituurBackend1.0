const { logger } = require('../utilities/');
const { Attachment, Comment, Insurance } = require('../models');

const rollBackLinkedModelDelete = async (parentId, linkedModel) => {
  const linkedModels = await linkedModel.find({ object_id: parentId }, { deleted: false }).lean();

  await Promise.all(linkedModels.map(async ({ _id }) => {
    await linkedModel.findOneAndUpdate({ _id, deleted: true }, { deleted: false });
  }));
};

const deleteLinkedModels = async (parentId, linkedModel, force) => {
  const linkedModels = await linkedModel.find({ object_id: parentId }, { deleted: false }).lean();

  await Promise.all(linkedModels.map(async ({ _id }) => {
    if (force) {
      await linkedModel.findOneAndDelete({ _id });
    } else {
      await linkedModel.findOneAndUpdate({ _id, deleted: false }, { deleted: true });
    }
  }));
};

module.exports = async (parentId, force) => {
  try {
    await deleteLinkedModels(parentId, Comment, force);
    await deleteLinkedModels(parentId, Attachment, force);
    await deleteLinkedModels(parentId, Insurance);
  } catch (error) {
    if (force) {
      logger.error('could not delete all linked models');
      return;
    }

    await rollBackLinkedModelDelete(parentId, Comment);
    await rollBackLinkedModelDelete(parentId, Attachment);
    await rollBackLinkedModelDelete(parentId, Insurance);
    throw error;
  }
};