const Sequelize = require('sequelize');
const user = require('./user');
const tag = require('./tag');
const invoice = require('./invoice');
const invoiceItem = require('./invoiceItem');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: false,
  },
});
const tables = {
  User: user(sequelize),
  Invoice: invoice(sequelize),
  Tag: tag(sequelize),
  InvoiceItem: invoiceItem(sequelize),
  sequelize,
};
tables.Invoice.belongsTo(tables.Tag, { foreignKey: 'tagId'})
tables.Invoice.hasMany(tables.InvoiceItem, { foreignKey: 'invoiceId' });

module.exports = tables;
