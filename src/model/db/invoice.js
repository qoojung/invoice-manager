const Sequelize = require('sequelize');

module.exports = (sequelize) => sequelize.define('invoice', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userName: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  shopDate: {
    type: Sequelize.DATE,
  },
  shopName: {
    type: Sequelize.STRING,
  },
});
