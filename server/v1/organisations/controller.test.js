jest.mock('../../../utilities');
jest.mock('../../../models/organisation');
jest.mock('../../../config');

const Organisation = require('../../../models/organisation');

const mocks = {
  json: jest.fn(() => mocks),
  end: jest.fn(() => mocks),
  status: jest.fn(() => mocks),
};

const mockReq = { body: {}, query: {} };
const mockReqWithID = { ...mockReq, query: { ...mockReq.query, id: '1' }, body: { ...mockReq.body, id: '1' } };
const mockRes = mocks;

const controller = require('../controller');

describe('Organisations', () => {
  describe('Controller', () => {
    // CREATE
    describe('Create', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 201', async () => {
        await controller.create(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalled();
      });

      test('Should have called Organisation.create', async () => {
        await controller.create(mockReqWithID, mockRes);
        expect(Organisation.create).toHaveBeenCalled();
      });
    });

    describe('Delete', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400 when body has no id', async () => {
        await controller.delete(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalled();
        expect(mockRes.end).toHaveBeenCalled();
      });

      test('Should call findOneAndUpdate', async () => {
        await controller.delete(mockReqWithID, mockRes);
        expect(Organisation.findOneAndUpdate).toHaveBeenCalled();
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
        expect(Organisation.findOne).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalled();
      });

      test('Should call Organisation.findOne', async () => {
        await controller.info(mockReqWithID, mockRes);
        expect(Organisation.findOne)
          .toHaveBeenCalled();
      });
    });

    describe('List', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 200', async () => {
        await controller.list(mockReq, mockRes);
        expect(Organisation.find).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalled();
      });

      test('Should have called .json', async () => {
        await controller.list(mockReqWithID, mockRes);
        expect(mockRes.json)
          .toHaveBeenCalled();
      });
    });

    describe('Update', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 400 when body has no id', async () => {
        await controller.update(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.end).toHaveBeenCalled();
      });

      test('Should call findOneAndUpdate when body has id', async () => {
        await controller.update(mockReqWithID, mockRes);
        expect(Organisation.findOneAndUpdate).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalled();
      });

      test('Should call Organisation.findOneAndUpdate', async () => {
        await controller.update(mockReqWithID, mockRes);

        expect(Organisation.findOneAndUpdate).toHaveBeenCalled();
      });

      test('Should call Organisation.json if the body has a valid existing id', async () => {
        await controller.update(mockReqWithID, mockRes);

        expect(mocks.json).toHaveBeenCalled();
      });
    });
  });
});