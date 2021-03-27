const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const logFormat = winston.format.printf(
  (info) => {
    if (info.stack) {
      return `${info.timestamp} ${info.level}: ${info.message} - ${info.stack}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
  },
);
const rotateTransport = new WinstonDailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '7d',
});
const winstonConfig = {
  level: 'debug',
  transports: [
    new winston.transports.Console(),
    rotateTransport,
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat,
  ),
};

const logger = winston.createLogger(winstonConfig);
module.exports = logger;