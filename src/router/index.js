const express = require('express');

const userRoute = require('./user');
const invoiceRoute = require('./invoice');
const tagRoute = require('./tag');
const sessionRoute = require('./session');

const route = express.Router();

route.use('/users', userRoute);
route.use('/session', sessionRoute);
route.use('/me/invoices', invoiceRoute);
route.use('/me/tags', tagRoute);
module.exports = route;
