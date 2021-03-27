const { StatusCodes } = require('http-status-codes');

const tagService = require('../service/tag');
const ApiResponse = require('../helper/apiResponse');

const tagController = () => {
  async function add(req, res) {
    const response = await tagService.add(req.body.name, req.user.username);
    new ApiResponse(res).sendMsg(response, StatusCodes.CREATED);
  }
  async function remove(req, res) {
    await tagService.remove(req.params.id, req.user.username);
    new ApiResponse(res).sendDone();
  }
  async function update(req, res) {
    await tagService.update(req.params.id, req.user.username, req.body.name);
    new ApiResponse(res).sendDone();
  }
  async function getByUser(req, res) {
    new ApiResponse(res).sendMsg(await tagService.getByUserName(req.user.username));
  }
  return {
    add, remove, update, getByUser,
  };
};
module.exports = tagController();
