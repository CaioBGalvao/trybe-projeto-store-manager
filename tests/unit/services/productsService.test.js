const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const productModel = require('../../../models/productsModel');
const productService = require('../../../services/productsService');

describe('SERVICE', () => {
  describe('GET ALL', () => {
    describe('Caso de exito', () => {
      afterEach(() => { Sinon.restore(); });
      it('Deve retornar um array', async () => {
        const resultExecute = []

        Sinon.stub(productModel, 'getAll').resolves(resultExecute);

        const resultado = await productService.getAll();

        expect(resultado).to.be.an('array');
      });
      it('Deve retornar um array vazios', async () => {
        const resultExecute = []

        Sinon.stub(productModel, 'getAll').resolves(resultExecute);

        const resultado = await productService.getAll();

        expect(resultado).to.be.empty;
      });
      it('Deve retornar um produto', async () => {
        const resultExecute = [
          {
            "id": 1,
            "name": "Martelo de Thor"
          }
        ]
        Sinon.stub(productModel, 'getAll').resolves(resultExecute);

        const resultado = await productService.getAll();

        expect(resultado).to.not.be.empty;
      })
      it('Retorna array contenha objeto com chaves id e name ', async () => {
        const resultExecute =
        {
          "id": 1,
          "name": "Martelo de Thor"
        }
        Sinon.stub(productModel, 'getAll').resolves(resultExecute);

        const resultado = await productService.getAll();

        expect(resultado).to.be.an('object');
        expect(resultado).to.all.keys('id', 'name')
      })
    });
    describe('GET BY ID', () => {
      describe('Caso de exito', () => {
        afterEach(() => { Sinon.restore(); });
        it('Deve retornar null caso chave id esteja vazia', async () => {
          const resultExecute = null;

          Sinon.stub(productModel, 'getById').resolves(resultExecute);

          const resultado = await productService.getById({ id: null});

          expect(resultado).to.be.null;
        });
        it('Deve retornar um produto', async () => {
          const resultExecute = [
            {
              "id": 1,
              "name": "Martelo de Thor"
            }
          ]
          Sinon.stub(productModel, 'getById').resolves(resultExecute);

          const resultado = await productService.getById({ id: 1 });

          expect(resultado).to.not.be.empty;
        })
        it('Retorna array contenha objetos com as chaves id e name ', async () => {
          const resultExecute = {
            "id": 1,
            "name": "Martelo de Thor"
          }

          Sinon.stub(productModel, 'getById').resolves(resultExecute);

          const resultado = await productService.getById({ id: 1 });

          expect(resultado).to.be.an('object');
          expect(resultado).to.all.keys('id', 'name')
        })
        it('Retorna array contenha objetos com a chave id de valor 1 ', async () => {
          const resultExecute = {
            "id": 1,
            "name": "Martelo de Thor"
          }
          Sinon.stub(productModel, 'getById').resolves(resultExecute);

          const resultado = await productService.getById({ id: 1 });

          expect(resultado.id).to.be.equal(1);
        })
        it('Retorna array contenha objetos com a chave name de valor Martelo de Thor ', async () => {
          const resultExecute = {
            "id": 1,
            "name": "Martelo de Thor"
          }
          Sinon.stub(productModel, 'getById').resolves(resultExecute);

          const resultado = await productService.getById({ id: 1 });

          expect(resultado.name).to.be.equal("Martelo de Thor");
        })
      });
    });
  });
});