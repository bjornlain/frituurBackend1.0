const mongoObject = {
  sort: jest.fn(() => mongoObject),
  skip: jest.fn(() => mongoObject),
  limit: jest.fn(() => mongoObject),
  lean: jest.fn(() => mongoObject),
  find: jest.fn(() => mongoObject),
  create: jest.fn(() => mongoObject),
  end: jest.fn(() => mongoObject),
  populate: jest.fn(() => mongoObject),
  findOneAndUpdate: jest.fn(() => mongoObject),
  findOne: jest.fn(() => mongoObject),
  select: jest.fn(() => mongoObject),
};

module.exports = mongoObject;