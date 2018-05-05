const News = require('../models/news')
const mailer = require('../mailer')
const logger = require('../logger')
const db = require('../database')

logger.info('Running send email task')

db.once('open', () => {
	News.filterBySent()
	.then(listNews => {
		listNews.forEach(news => {
			news.sent = true
			mailer.sendEmail(news)
			News.update(news)
		})
	})
	.catch(err => logger.error(err))
})
