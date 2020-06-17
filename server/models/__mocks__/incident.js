const mongoObject = {
  create: jest.fn(() => mongoObject),
  end: jest.fn(() => mongoObject),
  execPopulate: jest.fn(() => mongoObject),
  find: jest.fn(() => mongoObject),
  findOne: jest.fn(() => mongoObject),
  findOneAndUpdate: jest.fn(() => mongoObject),
  lean: jest.fn(() => mongoObject),
  limit: jest.fn(() => mongoObject),
  populate: jest.fn(() => mongoObject),
  select: jest.fn(() => mongoObject),
  skip: jest.fn(() => mongoObject),
  sort: jest.fn(() => mongoObject),
};

module.exports = mongoObject;