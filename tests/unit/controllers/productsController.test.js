const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const productController = require('../../../controllers/productsController');
const productService = require('../../../services/productsService');

describe('CONTROLLER', () => {
  describe('GET ALL', () => {
    describe('Caso de exito', () => {
      afterEach(() => { Sinon.restore(); });
      it('deve retornar 200 com um array vazio', async () => {
        const request = {};
        const response = {};

        response.status = Sinon.stub().returns(response);
        response.json = Sinon.stub().returns();
        const resultExecute = [];
        Sinon.stub(productService, 'getAll').resolves(resultExecute);

        await productController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith([])).to.be.equal(true);
        expect(response.status.calledOnce).to.be.true;
      });
      it('Deve retornar 200 com array com tudo', async () => {
        const request = {};
        const response = {};

        response.status = Sinon.stub().returns(response);
        response.json = Sinon.stub().returns();
        const resultExecute = [
          {
            "id": 1,
            "name": "Martelo de Thor"
          }
        ];
        Sinon.stub(productService, 'getAll').resolves(resultExecute);

        await productController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith([
          {
            "id": 1,
            "name": "Martelo de Thor"
          }
        ])).to.be.equal(true);
        expect(response.status.calledOnce).to.be.true;
      });
    });
    describe('Caso de Erro', () => {
      afterEach(() => { Sinon.restore(); });
      it('Deve retornar 404 com mensagem de produto não encontrado', async () => {
        const request = {};
        const response = {};

        response.status = Sinon.stub().returns(response);
        response.json = Sinon.stub().returns();
        const resultExecute = null;
        Sinon.stub(productService, 'getAll').resolves(resultExecute);

        await productController.getAll(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith(
          { message: 'Product not found' }
        )).to.be.equal(true);
        expect(response.status.calledOnce).to.be.true;
      });
    });
    describe('GET BY ID', () => {
      describe('Caso de exito', () => {
        afterEach(() => { Sinon.restore(); });
        it('Deve Responder 200 com id:1', async () => {
          const request = {};
          const response = {};

          response.status = Sinon.stub().returns(response);
          response.json = Sinon.stub().returns();

          request.params = { id: 1 };

          const resultExecute = { "id": 1, "name": "Martelo de Thor" }
          Sinon.stub(productService, 'getById').resolves(resultExecute);

          await productController.getById(request, response);

          expect(response.status.calledWith(200)).to.be.equal(true);
          expect(response.json.calledWith(
            {
              "id": 1,
              "name": "Martelo de Thor"
            },
          )).to.be.equal(true);
          expect(response.status.calledOnce).to.be.true;
        });
      });
    });
    describe('Caso de Erro', () => {
      afterEach(() => { Sinon.restore(); });
      it('Deve retornar 404 com mensagem de produto não encontrado', async () => {
        const request = {};
        const response = {};

        response.status = Sinon.stub().returns(response);
        response.json = Sinon.stub().returns();

        request.params = { id: 1 };
        
        const resultExecute = null
        Sinon.stub(productService, 'getById').resolves(resultExecute)

        await productController.getById(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith(
          { message: 'Product not found' }
        )).to.be.equal(true);
        expect(response.status.calledOnce).to.be.true;
      });
    });
  });
});