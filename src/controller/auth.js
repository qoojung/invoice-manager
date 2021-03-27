const ApiResponse = require('../helper/apiResponse');

const authController = () => {
  async function logout(req, res) {
    req.logout();
    new ApiResponse(res).sendDone();
  }
  async function loginSuccess(req, res) {
    new ApiResponse(res).sendMsg('login success');
  }
  return { logout, loginSuccess };
};
module.exports = authController();
