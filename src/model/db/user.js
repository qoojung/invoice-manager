const Sequelize = require('sequelize');

module.exports = (sequelize) => sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});
