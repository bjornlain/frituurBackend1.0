const winston = require('winston');

const {
  format: {
    combine, errors, logstash, timestamp, colorize, simple,
  },
  transports,
} = winston;

let logger = console;

// Don't read from our config here! We'll get a circular dependency.
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  const loggerTransports = [
    new transports.Console({ format: combine(colorize(), simple()), level: 'info' }),
    new winston.transports.File({ filename: 'error.log',
      level: 'error',
      format: combine(
        errors({ stack: true }),
        combine(timestamp(), logstash()),
      ) }),
  ];

  logger = winston.createLogger({
  /* eslint-disable sort-keys */
    level: 'info',
    transports: loggerTransports,

  /* eslint-enable sort-keys */
  });
}

module.exports = logger;