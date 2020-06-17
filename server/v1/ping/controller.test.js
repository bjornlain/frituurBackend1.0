const mockRes = {
  response: 'pong',
  json: jest.fn(),
};

const controller = require('../controller');

describe('Ping', () => {
  describe('Controller', () => {
    describe('Info', () => {
      test('Should have called ', async () => {
        await controller.info({}, mockRes);
        expect(mockRes.json).toHaveBeenCalledWith({ response: 'pong' });
      });
    });
  });
});