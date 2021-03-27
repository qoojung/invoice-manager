const express = require('express');
const expressLogger = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
const swaggerDocument = require('./swagger.json');
const authSetup = require('./helper/auth');
const route = require('./router');
const logger = require('./helper/logger.js');
const db = require('./model/db');
const ApiResponse = require('./helper/apiResponse');

async function startSever() {
  const app = express();
  const port = process.env.PORT || 3000;
  authSetup.setup(passport);
  app.use(expressLogger('dev'));
  app.use(express.json());
  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/api/v1/', route);
  /* eslint-disable-next-line no-unused-vars */
  app.use((err, req, res, next) => {
    new ApiResponse(res).sendErr(err.message);
  });
  app.listen(port, () => {
    logger.info(`Service is started at PORT ${port}`);
  });
}
(async () => {
  startSever();
})();
