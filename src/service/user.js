const bcrypt = require('bcrypt');
const { User } = require('../model/db');
const { SALT_ROUNDS } = require('../const');

const userService = () => {
  const register = async (userobj) => {
    const hashedPass = await bcrypt.hash(userobj.password, SALT_ROUNDS);
    const newUser = await User.create({
      username: userobj.username,
      password: hashedPass,
    });
    return newUser;
  };

  return { register };
};

module.exports = userService();
