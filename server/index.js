// ENVIRONMENT PROPERTIES
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || 4100;


// REQUIRES
const autoreap = require('multer-autoreap');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config');
const { errorhandler } = require('./middleware');
const { fs, logger } = require('./utilities');
const v1 = require('./v1');


// MONGOOSE
mongoose.connect(config.mongoose.uri, config.mongoose.options);


// PATHS
Object.values(config.paths).forEach((p) => fs.mkdirp(p));


// MAIN
(async function() {
  const app = express();

  app.use(helmet());
  app.use(autoreap);
  app.use(compression());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

  app.use('/attachments', express.static(config.paths.attachments));
  app.use('/avatars', express.static(config.paths.avatars));

  app.use('/api/v1', v1);
  app.use(errorhandler);

  await app.listen(process.env.PORT);
  /* eslint-disable no-console */
  logger.info(`Frtuur.App is running in ${process.env.NODE_ENV}.`);
  logger.info(`Listening on http://localhost:${process.env.PORT}.`);
  logger.info('Ctrl+C to shut down.');
  /* eslint-enable no-console */
}());