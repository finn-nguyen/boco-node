const express = require('express')
const app = express()
const logger = require('./logger')
const moment = require('moment')
const morgan = require('morgan')
const port = process.env.PORT || 8080
require('dotenv').config()
const db = require('./database')
const crawler = require('./workers/crawler')
const mailer = require('./workers/sentEmail')

app.use(morgan('combined', { stream: logger.stream }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

db.once('open', () => {
	app.listen(port, () => {
		logger.info(`Server is running at ${port}`)
	})
	crawler.startCrawler()
	mailer.startMailWorker()
})

