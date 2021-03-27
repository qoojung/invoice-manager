const express = require('express');
const passport = require('passport');

const auth = require('../controller/auth');
const asyncHandler = require('../helper/async');
const authMiddleware = require('../helper/authMiddleware');

const route = express.Router();

route.post('/logout', authMiddleware, asyncHandler(auth.logout));
route.post('/login', passport.authenticate('login', {
  usernameField: 'username',
  passwordField: 'password',
  failureFlash: false,
}), asyncHandler(auth.loginSuccess));
module.exports = route;
