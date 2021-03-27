const uuid = require('uuid');
const { Tag } = require('../model/db');

const invoiceService = () => {
  const add = async (name, userName) => {
    const tabentity = {
      id: uuid.v4(),
      userName,
      name,
    };
    return Tag.create(tabentity);
  };
  const remove = async (id, userName) => {
    const dbres = await Tag.destroy({
      where: {
        id,
        userName,
      },
    });
    if (dbres === 0) throw new Error('no permission or not exist');
  };
  const update = async (id, userName, name) => {
    const dbres = await Tag.update({ name }, {
      where: {
        id,
        userName,
      },
    });
    if (dbres[0] === 0) throw new Error('no permission or not exist');
  };
  const getByUserName = async (userName) => Tag.findAll({
    where: {
      userName,
    },
  });

  return {
    add, remove, update, getByUserName,
  };
};
module.exports = invoiceService();
