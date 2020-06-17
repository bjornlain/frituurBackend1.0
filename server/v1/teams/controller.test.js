jest.mock('../../../utilities');
jest.mock('../../../models/employee');
jest.mock('../../../config');

const Employee = require('../../../models/employee');

const mocks = {
  json: jest.fn(() => mocks),
  end: jest.fn(() => mocks),
  status: jest.fn(() => mocks),
};

const mockReq = { body: {}, query: {} };
const mockRes = mocks;

const controller = require('../controller');

describe('Teams', () => {
  describe('Controller', () => {
    // LIST
    describe('List', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 200', async () => {
        await controller.list(mockReq, mockRes);
        expect(Employee.distinct).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalled();
      });
    });
  });
});