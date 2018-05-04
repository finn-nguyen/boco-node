const winston = require('winston')
const winstonConfig = require('../config/winston')

const logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
})

logger.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}

export default logger