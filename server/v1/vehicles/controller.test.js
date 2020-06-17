jest.mock('../../../utilities');
jest.mock('../../../models/vehicle');
jest.mock('../../../config');

const Vehicle = require('../../../models/vehicle');

const mocks = {
  json: jest.fn(() => mocks),
  end: jest.fn(() => mocks),
  status: jest.fn(() => mocks),
};

const mockReq = { body: {}, query: {} };
const mockReqWithBody = { body: { id: '1' } };
const mockReqWithQuery = { query: { id: '1' } };
const mockRes = mocks;

const controller = require('../controller');

describe('Vehicles', () => {
  describe('Controller', () => {
    describe('Brands', () => {
      test('Should have called Brands.find', async () => {
        await controller.brands({}, mockRes);

        expect(Vehicle.distinct).toHaveBeenCalled();
      });
    });

    describe('Create', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 201', async () => {
        await controller.create(mockReqWithBody, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(201);
      });

      test('Should have called Vehicle.create', async () => {
        await controller.create(mockReqWithBody, mockRes);

        expect(Vehicle.create).toHaveBeenCalled();
      });
    });

    describe('Delete', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400 if body doesn\'t have an id', async () => {
        await controller.delete(mockReq, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(400);

        expect(mocks.end).toHaveBeenCalled();
      });

      test('Should call Vehicle.findOneAndUpdate', async () => {
        await controller.delete(mockReqWithBody, mockRes);
        expect(Vehicle.findOneAndUpdate)
          .toHaveBeenCalled();
      });

      test('Should call Vehicle.findOneAndDelete when force is used', async () => {
        mockReqWithBody.body.force = true;
        await controller.delete(mockReqWithBody, mockRes);
        expect(Vehicle.findOneAndDelete)
          .toHaveBeenCalled();
      });

      test('Should return 204', async () => {
        await controller.delete(mockReqWithBody, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(204);
        expect(mocks.end).toHaveBeenCalled();
      });
    });

    describe('info', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400 if query doesn\'t have an id', async () => {
        await controller.info(mockReq, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(400);
        expect(mocks.end).toHaveBeenCalled();
      });

      test('Should call Vehicle.findOne', async () => {
        await controller.info(mockReqWithQuery, mockRes);

        expect(Vehicle.findOne).toHaveBeenCalled();
      });
    });

    describe('List', () => {
      beforeEach(jest.clearAllMocks);

      test('Should have called Vehicle.find', async () => {
        await controller.list(mockReqWithQuery, mockRes);

        expect(Vehicle.find).toHaveBeenCalled();
      });

      test('Should have called .json', async () => {
        await controller.list(mockReqWithQuery, mockRes);

        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('Update', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400 if body doesn\'t have an id', async () => {
        await controller.update(mockReq, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(400);
        expect(mocks.end).toHaveBeenCalled();
      });

      test('Should call Vehicle.findOneAndUpdate', async () => {
        await controller.update(mockReqWithBody, mockRes);

        expect(Vehicle.findOneAndUpdate).toHaveBeenCalled();
      });

      test('Should call Vehicle.json if the body has a valid and existing id', async () => {
        await controller.update(mockReqWithBody, mockRes);

        expect(mocks.json).toHaveBeenCalled();
      });
    });
  });
});