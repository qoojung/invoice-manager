const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../model/db');
const { SALT_ROUNDS } = require('../const');

module.exports.setup = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    try {
      const user = await User.findByPk(username);
      if (!user) {
        return done(null, false);
      }
      const ok = await bcrypt.compare(user.password, password);
      if (ok) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
}