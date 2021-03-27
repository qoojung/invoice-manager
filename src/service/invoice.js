const uuid = require('uuid');
const { Invoice, InvoiceItem, Tag } = require('../model/db');

const ITEM_SECTION_START_LINE = 7;
const invoiceService = () => {
  const parseInvoice = (filebuffer) => {
    const lines = filebuffer.toString().split(/\r?\n/);
    if (lines.length < ITEM_SECTION_START_LINE) throw Error('invalid invoice');
    // parse tel, store, shopdate
    const invoiceObj = { shopName: lines[0] };

    if (!lines[1].startsWith('Tel :')) throw new Error('invalid invoice');
    invoiceObj.tel = lines[1].slice('Tel :'.length);

    const mat = lines[4].match(
      /Date:(\d{2}).(\d{2}).(\d{4}) *Time:(\d{2}):(\d{2}):(\d{2})/,
    );
    if (!mat) throw new Error('parse fail');
    invoiceObj.shopDate = new Date(mat[3], mat[2], mat[1], mat[4], mat[5], mat[6]);

    // start item section
    invoiceObj.items = [];
    let cursor = 7;
    while (lines[cursor] !== '' && cursor + 1 < lines.length) {
      const quantityTokens = lines[cursor + 1].split(' ', 3); // example: 2 x 1.3       2.6
      if (quantityTokens.length !== 3) throw new Error();
      const item = {
        name: lines[cursor],
        price: Number(quantityTokens[2]),
        quantity: Number(quantityTokens[0]),
      };
      invoiceObj.items.push(item);
      cursor += 2;
    }
    // get total
    invoiceObj.total = 0;
    for (;cursor < lines.length; cursor += 1) {
      if (lines[cursor].startsWith('Total :')) {
        invoiceObj.total = Number(lines[cursor].slice('Total :'.length).replace(' ', ''));
        break;
      }
    }
    return invoiceObj;
  };
  const updateTag = async (invoiceId, userName, tagId) => {
    const res = await Invoice.update({
      tagId,
    }, {
      where: {
        id: invoiceId,
        userName,
      },
    });
    return res;
  };
  const getInvoicebyUser = async (userName, tag) => {
    const where = { userName };
    if (tag) {
      const tagEntity = await Tag.findOne({
        where: {
          name: tag,
        },
      });
      if (!tagEntity) return {};
      where.tagId = tagEntity.id;
    }

    return Invoice.findAll(
      {
        where,
        attributes: {
          exclude: ['tagId'],
        },
        include: [{ model: InvoiceItem }, { model: Tag, attributes: ['name'] }],
      },
    );
  };
  const saveInvoiceInfo = async (userid, filebuffer) => {
    const obj = parseInvoice(filebuffer);
    const invoice = {
      id: uuid.v4(),
      userName: userid,
      shopDate: obj.shopDate,
      shopName: obj.shopName,
    };
    const items = obj.items.map((ele) => (
      {
        itemId: uuid.v4(),
        invoiceId: invoice.id,
        itemName: ele.name,
        quantity: ele.quantity,
        unitprice: ele.price,
      }));
    const invoiceEntity = await Invoice.create(invoice);
    await InvoiceItem.bulkCreate(items);
    return invoiceEntity;
  };
  return {
    saveInvoiceInfo, parseInvoice, getInvoicebyUser, updateTag,
  };
};
module.exports = invoiceService();
