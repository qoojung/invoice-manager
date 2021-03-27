const multer = require('multer');
const express = require('express');
const invoice = require('../controller/invoice');
const asyncHandler = require('../helper/async');
const auth = require('../helper/authMiddleware');
const { UPLOAD_LIMIT } = require('../const');

const route = express.Router();
const upload = multer({
  limit: {
    fileSize: UPLOAD_LIMIT,
  },
});
route.post('/', auth, upload.single('invoice'), asyncHandler(invoice.uploadInvoice));
route.get('/', auth, asyncHandler(invoice.getInvoiceByUser));
route.put('/:invoiceId/tag', auth, asyncHandler(invoice.setTag));
module.exports = route;
