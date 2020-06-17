jest.mock('../../../utilities');
jest.mock('../../../models/project');
jest.mock('../../../config');

const Project = require('../../../models/project');

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

describe('Projects', () => {
  describe('Controller', () => {
    describe('Avatar', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400', async () => {
        await controller.avatar(mockReqWithBody, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
      });

      // TODO: ADD SOME TESTS FOR THE FILE UPLOADER??
    });

    describe('Categories', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return called .json', async () => {
        await controller.categories(mockReqWithQuery, mockRes);

        expect(mocks.json).toHaveBeenCalled();
      });
    });

    describe('Create', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 201', async () => {
        await controller.create(mockReqWithBody, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(201);
      });

      test('Should have called Project.create', async () => {
        await controller.create(mockReqWithBody, mockRes);
        expect(Project.create).toHaveBeenCalled();
      });
    });

    describe('Delete', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400 if body doesn\'t have an id', async () => {
        await controller.delete(mockReq, mockRes);
        expect(mocks.status).toHaveBeenCalledWith(400);

        expect(mocks.end).toHaveBeenCalled();
      });

      test('Should call Project.findOneAndUpdate', async () => {
        await controller.delete(mockReqWithBody, mockRes);
        expect(Project.findOneAndUpdate).toHaveBeenCalled();
      });

      test('Should return 204', async () => {
        await controller.delete(mockReqWithBody, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(204);
        expect(mocks.end).toHaveBeenCalled();
      });
    });

    describe('Info', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400 if query doesn\'t have an id', async () => {
        await controller.info(mockReq, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(400);
        expect(mocks.end).toHaveBeenCalled();
      });

      test('Should call Project.findOne', async () => {
        await controller.info(mockReqWithQuery, mockRes);
        expect(Project.findOne).toHaveBeenCalled();
      });
    });

    describe('List', () => {
      beforeEach(jest.clearAllMocks);

      test('Should have called Project.find', async () => {
        await controller.list(mockReqWithQuery, mockRes);

        expect(Project.find).toHaveBeenCalled();
      });

      test('Should have called .json', async () => {
        await controller.list(mockReqWithQuery, mockRes);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('Kinds', () => {
      beforeEach(jest.clearAllMocks);

      test('Should have called .json', async () => {
        await controller.kinds(mockReqWithQuery, mockRes);

        expect(mocks.json).toHaveBeenCalled();
      });
    });

    describe('Update', () => {
      beforeEach(jest.clearAllMocks);

      test('Should return 400 if body doesn\'t have an id', async () => {
        await controller.update(mockReq, mockRes);

        expect(mocks.status).toHaveBeenCalledWith(400);
        expect(mocks.end).toHaveBeenCalled();
      });

      test('Should call Employee.findOneAndUpdate', async () => {
        await controller.update(mockReqWithBody, mockRes);

        expect(Project.findOneAndUpdate).toHaveBeenCalled();
      });

      test('Should call Project.json if the body has a valid existing id', async () => {
        await controller.update(mockReqWithBody, mockRes);

        expect(mocks.json).toHaveBeenCalled();
      });
    });
  });
});