jest.mock('../../../utilities');
jest.mock('../../../models/asset');
jest.mock('../../../config');

const Asset = require('../../../models/asset');

const mocks = {
  json: jest.fn(() => mocks),
  end: jest.fn(() => mocks),
  status: jest.fn(() => mocks),
};

const mockReq = {
  body: {},
  query: {},
};

const mockReqWithBodyNoName = { body: { id: '1' } };
const mockReqWithBody = { body: { id: '1', name: 'asset', owner: '0' } };
const mockReqWithQuery = { query: { id: '1' } };
const mockRes = mocks;

const controller = require('../controller');

describe('Asset', () => {
  describe('Controller', () => {
    describe('Create', () => {
      beforeEach(jest.clearAllMocks);

      test('Should throw if body does not contain name', async () => {
        await expect(controller.create({ mockReqWithBodyNoName }, mockRes)).rejects.toThrow();
      });

      test('Should return 403 if owned is required but the user is wrong', async () => {
        await controller.create({ ...mockReqWithBody, owned: true, user: { _id: '1' } }, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(403);
      });

      test('Should return 201', async () => {
        await controller.create(mockReqWithBody, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(201);
      });

      test('Should have called Asset.create', async () => {
        await controller.create(mockReqWithBody, mockRes);
        expect(Asset.create).toHaveBeenCalled();
      });
    });

    describe('Delete', () => {
      beforeEach(jest.clearAllMocks);

      test("Should return 400 if body doesn't have an id", async () => {
        await controller.delete(mockReq, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(400);

        expect(mocks.end).toHaveBeenCalled();
      });

      test('Should return 403 if owned is required but the user is wrong', async () => {
        await controller.create({ ...mockReqWithBody, owned: true, user: { _id: '1' } }, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(403);
      });

      test('Should call Asset.findOneAndUpdate', async () => {
        await controller.delete(mockReqWithBody, mockRes);
        expect(Asset.findOneAndUpdate).toHaveBeenCalled();
      });

      test('Should return 204', async () => {
        await controller.delete(mockReqWithBody, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(204);
        expect(mocks.end).toHaveBeenCalled();
      });
    });

    describe('info', () => {
      beforeEach(jest.clearAllMocks);

      test("Should return 400 if query doesn't have an id", async () => {
        await controller.info({}, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(400);
        expect(mocks.end).toHaveBeenCalled();
      });

      test('Should return 403 if owned is required but the user is wrong', async () => {
        await controller.create({ ...mockReqWithBody, owned: true, user: { _id: '1' } }, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(403);
      });

      test('Should call Asset.findOne', async () => {
        await controller.info(mockReqWithQuery, mockRes);

        expect(Asset.findOne).toHaveBeenCalled();
      });
    });

    describe('List', () => {
      beforeEach(jest.clearAllMocks);

      test('Should have called Asset.find', async () => {
        await controller.list(mockReqWithQuery, mockRes);

        expect(Asset.find).toHaveBeenCalled();
      });

      test('Should have called .json', async () => {
        await controller.list(mockReqWithQuery, mockRes);

        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('Update', () => {
      beforeEach(jest.clearAllMocks);

      test("Should return 400 if body doesn't have an id", async () => {
        await controller.update({ body: {} }, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(400);
        expect(mocks.end).toHaveBeenCalled();
      });

      test('Should return 403 if owned is required but the user is wrong', async () => {
        await controller.create({ ...mockReqWithBody, owned: true, user: { _id: '1' } }, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(403);
      });

      test('Should throw if body does not contain name', async () => {
        await expect(controller.create({ mockReqWithBodyNoName }, mockRes)).rejects.toThrow();
      });

      test('Should call Asset.findOneAndUpdate', async () => {
        await controller.update(mockReqWithBody, mockRes);

        expect(Asset.findOneAndUpdate).toHaveBeenCalled();
      });

      test('Should return 204', async () => {
        await controller.update(mockReqWithBody, mockRes);

        expect(mocks.json).toHaveBeenCalled();
      });
    });
  });
});