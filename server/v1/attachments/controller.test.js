jest.mock('../../../utilities');
jest.mock('../../../models/attachment');
jest.mock('../../../config');
jest.mock('path', () => ({
  resolve: jest.fn(),
  extname: jest.fn(),
}));

const Attachment = require('../../../models/attachment');

const mocks = {
  json: jest.fn(() => mocks),
  end: jest.fn(() => mocks),
  status: jest.fn(() => mocks),
};

const emptyMockReq = { body: {} };
const mockReqWithEmptyFile = { body: { object_type: 'asset', object_id: '1' }, files: [{}] };
const mockRequestWithFiles = {
  body: {
    object_type: 'asset',
    object_id: '1',
  },
  files: [{
    size: 1,
    filename: 'file1',
    originalname: 'file1.ext',
  }, {
    size: 2,
    filename: 'file2',
    originalname: 'file2.ext',
  }],
};
const mockReqWithBody = { body: {} };
const mockReqWithQuery = { query: {} };
const mockReqWithBodyID1 = { body: { id: '1' } };
const mockReqWithBodyID2 = { body: { id: '2' } };
const mockReqWithQueryID1 = { query: { id: '1' } };
const mockReqWithQueryID2 = { query: { id: '2' } };
const mockRes = mocks;

const controller = require('../controller');

describe('Attachments', () => {
  describe('Controller', () => {
    describe('Create', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 400 if files doesn\'t exist or files is not an array', async () => {
        await controller.create(emptyMockReq, mockRes);

        expect(mocks.status)
          .toHaveBeenCalledWith(400);
        expect(mocks.end)
          .toHaveBeenCalled();
      });

      test('Should call fail when a file doesn\'t have a size', async () => {
        await controller.create(mockReqWithEmptyFile, mockRes);
        expect(mocks.status)
          .toHaveBeenCalledWith(201);
        expect(mocks.json)
          .toHaveBeenCalledWith([]);
      });

      test('Should call create as many times as there are files', async () => {
        await controller.create(mockRequestWithFiles, mockRes);
        expect(Attachment.create)
          .toHaveBeenCalledTimes(2);
      });
    });

    describe('Delete', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 400 if body doesn\'t have an id', async () => {
        await controller.delete(mockReqWithBody, mockRes);

        expect(mocks.status)
          .toHaveBeenCalledWith(400);
        expect(mocks.end)
          .toHaveBeenCalled();
      });

      test('Should call findOneAndUpdate', async () => {
        await controller.delete(mockReqWithBodyID1, mockRes);
        expect(Attachment.findOneAndUpdate)
          .toHaveBeenCalled();
      });

      test('Should return 204 body has id 1', async () => {
        await controller.delete(mockReqWithBodyID1, mockRes);
        expect(mocks.status)
          .toHaveBeenCalledWith(204);
        expect(mocks.end)
          .toHaveBeenCalled();
      });

      test('Should return 404 body has id 2', async () => {
        await controller.delete(mockReqWithBodyID2, mockRes);
        expect(mocks.status)
          .toHaveBeenCalledWith(404);
        expect(mocks.end)
          .toHaveBeenCalled();
      });
    });

    describe('info', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400 if query doesn\'t have an id', async () => {
        await controller.info(mockReqWithQuery, mockRes);

        expect(mocks.status)
          .toHaveBeenCalledWith(400);
        expect(mocks.end)
          .toHaveBeenCalled();
      });

      test('Should call findOne', async () => {
        await controller.info(mockReqWithQueryID1, mockRes);
        expect(Attachment.findOne)
          .toHaveBeenCalled();
      });

      test('Should return the id if id is 1', async () => {
        await controller.info(mockReqWithQueryID1, mockRes);
        expect(mocks.json)
          .toHaveBeenCalledWith(true);
      });

      test('Should return 404 if id is 2', async () => {
        await controller.info(mockReqWithQueryID2, mockRes);
        expect(mocks.status)
          .toHaveBeenCalledWith(404);
        expect(mocks.end)
          .toHaveBeenCalled();
      });
    });

    describe('List', () => {
      beforeEach(jest.clearAllMocks);

      test('Should have called Attachment.find', async () => {
        await controller.list(mockReqWithQuery, mockRes);
        expect(Attachment.find)
          .toHaveBeenCalled();
      });

      test('Should have called .json', async () => {
        await controller.list(mockReqWithQuery, mockRes);
        expect(mockRes.json)
          .toHaveBeenCalled();
      });
    });

    describe('Update', () => {
      beforeEach(jest.clearAllMocks);
      test('Should return 400 if body doesn\'t have an id', async () => {
        await controller.update(mockReqWithBody, mockRes);
        expect(mocks.status)
          .toHaveBeenCalledWith(400);
        expect(mocks.end)
          .toHaveBeenCalled();
      });

      test('Should call findOneAndUpdate', async () => {
        await controller.update(mockReqWithBodyID1, mockRes);
        expect(Attachment.findOneAndUpdate)
          .toHaveBeenCalled();
      });

      test('Should call Attachment.json if the body has a valid existing id', async () => {
        await controller.update(mockReqWithBodyID1, mockRes);
        expect(mocks.json)
          .toHaveBeenCalled();
      });

      test('Should return 404 body has id 2', async () => {
        await controller.update(mockReqWithBodyID2, mockRes);
        expect(mocks.status)
          .toHaveBeenCalledWith(404);
        expect(mocks.end)
          .toHaveBeenCalled();
      });
    });
  });
});