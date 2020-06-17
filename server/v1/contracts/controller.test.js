jest.mock('../../../utilities');
jest.mock('../../../models/contract');
jest.mock('../../../config');

const Contract = require('../../../models/contract');

const mocks = {
  json: jest.fn(() => mocks),
  end: jest.fn(() => mocks),

  status: jest.fn(() => mocks),
};

const mockReq = {
  body: {},
  query: {},
};

const mockReqWithID = {
  ...mockReq,
  query: {
    ...mockReq.query,
    id: '1',
  },
  body: {
    ...mockReq.body,
    id: '1',
  },
};
const mockRes = mocks;

const controller = require('../controller');

describe('Contracts', () => {
  describe('Controller', () => {
    // CREATE
    describe('Create', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 201', async () => {
        await controller.create(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    // DELETE
    describe('Delete', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 400 when body has no id', async () => {
        await controller.delete(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalled();
        expect(mockRes.end).toHaveBeenCalled();
      });

      test('Should call findOneAndUpdate', async () => {
        await controller.delete(mockReqWithID, mockRes);
        expect(Contract.findOneAndUpdate).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.end).toHaveBeenCalled();
      });
    });

    // INFO
    describe('Info', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return with status 400 when query has no id', async () => {
        await controller.info(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.end).toHaveBeenCalled();
      });

      test('Should call findOne when id has been given', async () => {
        await controller.info(mockReqWithID, mockRes);
        expect(Contract.findOne).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    // LIST
    describe('List', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 200', async () => {
        await controller.list(mockReq, mockRes);
        expect(Contract.find).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    // UPDATE
    describe('Update', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 400 when body has no id', async () => {
        await controller.update(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.end).toHaveBeenCalled();
      });

      test('Should call findOneAndUpdate when body has id', async () => {
        await controller.update(mockReqWithID, mockRes);

        expect(Contract.findOneAndUpdate).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalled();
      });
    });
  });
});