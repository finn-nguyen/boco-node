const winston = require('winston')
const rootPath = require('app-root-path')

const options = {
  file: {
    level: 'info',
    filename: `${rootPath}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

module.exports = options