const express = require('express');
const tag = require('../controller/tag');
const asyncHandler = require('../helper/async');
const auth = require('../helper/authMiddleware');

const route = express.Router();

route.post('/', auth, asyncHandler(tag.add));
route.delete('/:id', auth, asyncHandler(tag.remove));
route.patch('/:id', auth, asyncHandler(tag.update));
route.get('/', auth, asyncHandler(tag.getByUser));
module.exports = route;
