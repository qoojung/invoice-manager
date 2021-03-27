const { StatusCodes } = require('http-status-codes');

const invoiceService = require('../service/invoice');
const ApiResponse = require('../helper/apiResponse');
const logger = require('../helper/logger');

const invoiceController = () => {
  async function getInvoiceByUser(req, res) {
    if (req.query.tagName) {
      return new ApiResponse(res).sendMsg(await invoiceService.getInvoicebyUser(
        req.user.username, req.query.tagName,
      ));
    }
    return new ApiResponse(res).sendMsg(await invoiceService.getInvoicebyUser(req.user.username));
  }
  async function setTag(req, res) {
    const updateResp = await invoiceService.updateTag(
      req.params.invoiceId, 
      req.user.username,
      req.body.tagId);
    if (updateResp[0] === 1) {
      return new ApiResponse(res).sendMsg("done");
    } else {
      return new ApiResponse(res).sendErr("can not get tag", StatusCodes.NOT_FOUND);
    }
  }
  async function uploadInvoice(req, res) {
    const apiResp = new ApiResponse(res);
    if (!req.file || req.file.buffer === undefined) {
      return apiResp.sendErr('Bad Request', StatusCodes.BAD_REQUEST);
    }
    const resp = await invoiceService.saveInvoiceInfo(req.user.username, req.file.buffer);
    return apiResp.sendMsg(resp, StatusCodes.CREATED);
  }
  return { setTag, getInvoiceByUser, uploadInvoice };
};
module.exports = invoiceController();
