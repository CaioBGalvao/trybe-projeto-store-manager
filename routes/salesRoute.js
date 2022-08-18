const express = require('express');

const { salesController } = require('../controllers');

const productsRoute = express.Router();

productsRoute.post('/', salesController.create);

module.exports = productsRoute;