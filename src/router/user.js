const express = require('express');
const userController = require('../controller/user');
const asyncHandler = require('../helper/async');

const route = express.Router();

route.post('/', asyncHandler(userController.registerUser));
module.exports = route;
