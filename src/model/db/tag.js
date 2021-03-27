const Sequelize = require('sequelize');

module.exports = (sequelize) => sequelize.define('tag', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userName: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
});
