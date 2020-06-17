jest.mock('../../../utilities');
jest.mock('../../../models/invoice');
jest.mock('../../../config');

const Invoice = require('../../../models/invoice');

const mocks = {
  json: jest.fn(() => mocks),
  end: jest.fn(() => mocks),
  status: jest.fn(() => mocks),
};

const mockReq = {
  body: {},
  query: {},
};
const mockReqWithBody = { body: { id: '1' } };
const mockReqWithQuery = { query: { id: '1' } };
const mockRes = mocks;

const controller = require('../controller');

describe('Invoices', () => {
  describe('Controller', () => {
    describe('Create', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 201', async () => {
        await controller.create(mockReqWithBody, mockRes);
        expect(mockRes.status)
          .toHaveBeenCalledWith(201);
      });

      test('Should have called Comment.create', async () => {
        await controller.create(mockReqWithBody, mockRes);
        expect(Invoice.create)
          .toHaveBeenCalled();
      });
    });

    describe('Delete', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400 if body doesn\'t have an id', async () => {
        await controller.delete(mockReq, mockRes);

        expect(mocks.status)
          .toHaveBeenCalledWith(400);

        expect(mocks.end)
          .toHaveBeenCalled();
      });

      test('Should call Comment.findOneAndUpdate', async () => {
        await controller.delete(mockReqWithBody, mockRes);
        expect(Invoice.findOneAndUpdate)
          .toHaveBeenCalled();
      });

      test('Should return 204', async () => {
        await controller.delete(mockReqWithBody, mockRes);

        expect(mocks.status)
          .toHaveBeenCalledWith(204);
        expect(mocks.end)
          .toHaveBeenCalled();
      });
    });

    describe('info', () => {
      beforeEach(jest.clearAllMocks);

      test('Should call Comment.json if the body has a valid existing id', async () => {
        await controller.info(mockReqWithQuery, mockRes);
        expect(mocks.json)
          .toHaveBeenCalled();
      });

      test('Should call Comment.findOne', async () => {
        await controller.info(mockReqWithQuery, mockRes);

        expect(Invoice.findOne)
          .toHaveBeenCalled();
      });
    });

    describe('List', () => {
      beforeEach(jest.clearAllMocks);

      test('Should have called Comment.find', async () => {
        await controller.list(mockReqWithQuery, mockRes);

        expect(Invoice.find)
          .toHaveBeenCalled();
      });

      test('Should have called .json', async () => {
        await controller.list(mockReqWithQuery, mockRes);

        expect(mockRes.json)
          .toHaveBeenCalled();
      });
    });

    describe('Vat percentages', () => {
      beforeEach(jest.clearAllMocks);
      test('Should have called res.json', () => {
        controller.vatPercentages(mockReq, mockRes);
        expect(mocks.json)
          .toHaveBeenCalled();
      });
    });

    describe('Update', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400 if body doesn\'t have an id', async () => {
        await controller.update(mockReq, mockRes);

        expect(mocks.status)
          .toHaveBeenCalledWith(400);
        expect(mocks.end)
          .toHaveBeenCalled();
      });

      test('Should call Comment.findOneAndUpdate', async () => {
        await controller.update(mockReqWithBody, mockRes);

        expect(Invoice.findOneAndUpdate)
          .toHaveBeenCalled();
      });

      test('Should call Attachment.json if the body has a valid existing id', async () => {
        await controller.update(mockReqWithBody, mockRes);

        expect(mocks.json)
          .toHaveBeenCalled();
      });
    });
  });
});