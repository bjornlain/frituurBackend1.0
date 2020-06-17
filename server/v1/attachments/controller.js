// REQUIRES
const Path = require('path');
const { Attachment } = require('../../models');
const config = require('../../config');
const { canAccesOwnLinkedEntity, fs, query, trycatch } = require('../../utilities');

const getFilesToWrite = async (files) => {
  const filesToWriteRaw = await Promise.all(files.map(async (
    { encoding, filename, mimetype, originalname, path, size },
  ) => {
    if (!size) {
      return null;
    }

    return { encoding, file_name: `${filename}${Path.extname(originalname)}`, mime_type: mimetype, original_name: originalname, path, size };
  }));

  return filesToWriteRaw.filter((file) => file);
};

// PUBLIC METHODS
module.exports.create = trycatch(async ({ body, files, owned, user }, res) => {
  if (!files || !files.length) return res.status(400).end();
  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, body);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const filesToWrite = await getFilesToWrite(files, owned, user, body);

  const attachments = await Promise.all(
    filesToWrite.map(async (file) => {
      const attachment = await Attachment.create({ ...file, ...body });
      await fs.rename(file.path, Path.resolve(config.paths.attachments, file.file_name));

      return attachment;
    }),
  );

  return res.status(201).json(attachments);
});

module.exports.delete = trycatch(async ({ body, owned, user }, res) => {
  if (!body.id) return res.status(400).end();

  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, body);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const attachment = await Attachment.findOneAndUpdate({ _id: body.id, deleted: false }, { deleted: true });
  return res.status(attachment ? 204 : 404).end();
});

module.exports.info = trycatch(async ({ owned, user, query: reqQuery }, res) => {
  if (!reqQuery.id) return res.status(400).end();

  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, reqQuery);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const attachment = await Attachment.findOne({ _id: reqQuery.id, deleted: false }).lean();
  if (!attachment) return res.status(404).end();
  return res.json(attachment);
});

module.exports.list = trycatch(async (req, res) => {
  const attachments = await Attachment.find(query.where(req, { deleted: false }))
    .sort(req.query.sort || 'created')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit < config.settings.page_limit ? +req.query.limit : config.settings.page_limit)
    .lean();
  return res.json(attachments);
});

module.exports.update = trycatch(async ({ body, owned, user }, res) => {
  if (!body.id) return res.status(400).end();

  const accessAllowed = await canAccesOwnLinkedEntity(owned, user, body);

  if (!accessAllowed) {
    return res.status(403).end();
  }

  const attachment = await Attachment.findOneAndUpdate({ _id: body.id, deleted: false }, body, { new: true });
  if (!attachment) return res.status(404).end();
  return res.json(attachment);
});