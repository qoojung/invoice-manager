const express = require('express');

const userRoute = require('./user');
const invoiceRoute = require('./invoice');
const tagRoute = require('./tag');
const sessionRoute = require('./session');

const route = express.Router();
route.get('/', (req, res) => res.json({
  apiversion: 1,
  title: 'Invoice Manager Server Root',
}));
route.use('/users', userRoute);
route.use('/session', sessionRoute);
route.use('/me/invoices', invoiceRoute);
route.use('/me/tags', tagRoute);
module.exports = route;
