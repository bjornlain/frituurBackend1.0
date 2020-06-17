const mongoObject = {
  sort: jest.fn(() => mongoObject),
  skip: jest.fn(() => mongoObject),
  limit: jest.fn(() => mongoObject),
  lean: jest.fn(() => mongoObject),
  find: jest.fn(() => mongoObject),
  create: jest.fn(() => mongoObject),
  end: jest.fn(() => mongoObject),
  findOneAndUpdate: jest.fn((filter) => filter._id === '1'),
  findOne: jest.fn((filter) => ({ lean: jest.fn(() => filter._id === '1') })),
};

module.exports = mongoObject;