const mongoose = require('mongoose')
const logger = require('../logger')

mongoose.connect('mongodb://localhost:27017/boco-db')

const db = mongoose.connection

db.on('error', () => logger.error('Connect to mongodb failed!'))
db.once('open', () => logger.info('Connect to mongodb success!'))

module.exports = db