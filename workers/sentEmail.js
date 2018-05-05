const News = require('../models/news')
const mailer = require('../mailer')
const logger = require('../logger')
const schedule = require('node-schedule')

const sendEmailTask = () => {
	News.filterBySent()
	.then(listNews => {
		listNews.forEach(news => {
			news.sent = true
			mailer.sendEmail(news)
			News.update(news)
		})
	})
	.catch(err => logger.error(err))
}

module.exports.startMailWorker = () => {
	logger.info('Start mail worker')
	schedule.scheduleJob('* */1 * * * *', () => {
		sendEmailTask()
	})
}

