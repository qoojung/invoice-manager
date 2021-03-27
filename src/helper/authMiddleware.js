const { StatusCodes } = require('http-status-codes');
const ApiResponse = require('./apiResponse');

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return new ApiResponse(res).sendErr('please log in', StatusCodes.UNAUTHORIZED);
  }
  return next();
};
