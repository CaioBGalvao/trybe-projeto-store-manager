const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productsModel');

describe('MODEL', () => {
  describe('GET ALL', () => {
    describe('Caso de exito', () => {
      afterEach(() => { Sinon.restore(); });
      it('Deve retornar um array de produtos', async () => {
        const resutExecute = []
        Sinon.stub(connection, 'execute').resolves([resutExecute]);

        const resultado = await productModel.getAll();

        expect(resultado).to.be.an('array');
      });
      it('Deve retornar um array de produtos vazios', async () => {
        const resutExecute = []
        Sinon.stub(connection, 'execute').resolves([resutExecute]);

        const resultado = await productModel.getAll();

        expect(resultado).to.be.empty;
      });
      it('Deve retornar um produto', async () => {
        const resutExecute = [
          {
            "id": 1,
            "name": "Martelo de Thor"
          }
        ]
        Sinon.stub(connection, 'execute').resolves([resutExecute]);

        const resultado = await productModel.getAll();

        expect(resultado).to.not.be.empty;
      })
      it('Retorna array contenha objetos ', async () => {
        const resultExecute = [
          {
            "id": 1,
            "name": "Martelo de Thor"
          }
        ]
        Sinon.stub(connection, 'execute').resolves([resultExecute]);

        const [resultado] = await productModel.getAll();

        expect(resultado).to.be.an('object');
        expect(resultado).to.all.keys('id', 'name')
      })
    });
    describe('GET BY ID', () => {
      describe('Caso de exito', () => {
        afterEach(() => { Sinon.restore(); });
        it('Deve retornar um produto', async () => {
          const resultExecute = [[{ "id": 1, "name": "Martelo de Thor" }]]
          Sinon.stub(connection, 'execute').resolves(resultExecute);

          const resultado = await productModel.getById(1);

          expect(resultado).to.not.be.empty;
        })
        it('Retorna array contenha objetos ', async () => {
          const resultExecute = [[{ "id": 1, "name": "Martelo de Thor" }]]
          Sinon.stub(connection, 'execute').resolves(resultExecute);

          const resultado = await productModel.getById(1);

          expect(resultado).to.be.an('object');
          expect(resultado).to.all.keys('id', 'name')
        })
        it('Retorna array contenha objetos de id 1 ', async () => {
          const resultExecute = [[{ "id": 1, "name": "Martelo de Thor" }]]
          Sinon.stub(connection, 'execute').resolves(resultExecute);

          const resultado = await productModel.getById(1);

          expect(resultado.id).to.be.equal(1);
        })
        it('Retorna array contenha objetos de name Martelo de Thor ', async () => {
          const resultExecute = [[{"id": 1,"name": "Martelo de Thor"}]]
          Sinon.stub(connection, 'execute').resolves(resultExecute);

          const resultado = await productModel.getById(1);

          expect(resultado.name).to.be.equal("Martelo de Thor");
        })
      });  
    });
  });
});