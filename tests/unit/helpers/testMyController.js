const Sinon = require('sinon')

const testMyController = async (controller, request = {}) => {
  const resultado = {
    body: undefined,
    status: undefined,
  }

  const response = {
    status: (num) => {
      resultado.status = num;
      return response;
    },
    json: (obj) => {
      resultado.body = obj;
      return null;
    }
  }

  const spyJson = Sinon.spy(response, 'json');
  const spyStatus = Sinon.spy(response, 'status');

  await controller(request, response);
  return { ...resultado, spies: { json: spyJson, status: spyStatus } };
}

module.exports = testMyController;