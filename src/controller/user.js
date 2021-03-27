const { StatusCodes } = require('http-status-codes');

const userService = require('../service/user');
const ApiResponse = require('../helper/apiResponse');

const userController = () => {
  async function registerUser(req, res) {
    await userService.register(req.body);
    new ApiResponse(res).sendDone(StatusCodes.CREATED);
  }
  return { registerUser };
};
module.exports = userController();
