jest.mock('zxcvbn');
jest.mock('../../../utilities');
jest.mock('../../../models/user');
jest.mock('../../../config');

const user = require('../../../models/user');
const utilities = require('../../../utilities');

const mocks = {
  json: jest.fn(),
  end: jest.fn(),
  status: jest.fn(() => ({
    json: mocks.json,
    end: mocks.end,
  })),
};

const mockReq = { body: {} };
const mockRes = { status: mocks.status };

const controller = require('../controller');

describe('Auth', () => {
  describe('Controller', () => {
    describe('forgot', () => {
      it('should return 400 if req.body.email is undefined', async () => {
        await controller.forgot(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
      });

      it('should call findOne on User', async () => {
        mockReq.body.email = 'some email';
        await controller.forgot(mockReq, mockRes);
        expect(user.findOne).toHaveBeenCalled();
      });

      it('should return 401 if no user is found', async () => {
        await controller.forgot(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(401);
      });

      it('should return 401 if user is deleted', async () => {
        const userObj = { deleted: true };
        user.findOne = jest.fn(() => userObj);
        await controller.forgot(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(401);
      });

      it('should return 401 if user is not approved', async () => {
        const userObj = {
          deleted: false,
          isApproved: () => false,
        };
        user.findOne = jest.fn(() => userObj);
        await controller.forgot(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(401);
      });

      it('should call save on user', async () => {
        const userObj = {
          deleted: false,
          isApproved: () => true,
          save: jest.fn(() => userObj),
        };
        user.findOne = jest.fn(() => userObj);
        await controller.forgot(mockReq, mockRes);
        expect(userObj.save).toHaveBeenCalled();
      });

      it('should call mailer.send', async () => {
        await controller.forgot(mockReq, mockRes);
        expect(utilities.mailer.send).toHaveBeenCalled();
      });

      it('should return 500 if mail is unsuccessful', async () => {
        const userObj = {
          deleted: false,
          isApproved: () => true,
          save: jest.fn(() => userObj),
        };
        await controller.forgot(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(500);
      });
    });
  });
});