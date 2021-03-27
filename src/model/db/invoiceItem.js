const Sequelize = require('sequelize');

module.exports = (sequelize) => sequelize.define('invoiceItem', {
  itemId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  itemName: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  unitprice: {
    type: Sequelize.DOUBLE,
  },
});
