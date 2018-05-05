const News = require('../models/news')
const mailer = require('../mailer')
const logger = require('../logger')
const schedule = require('node-schedule')
const helpers = require('../helpers')

const sendEmailTask = async() => {
	const perPage = 5
	const totalNews = await News.totalNewsNotSent()
	const totalPage = (totalNews / perPage) + (totalNews % perPage === 0 ? 0 : 1)
	for (let i = 0; i < totalPage; i++) {
		sendChunkEmail(i, perPage)
		await helpers.sleep(10000)
	}
}

const sendChunkEmail = (currentPage, perPage) => {
	logger.info(`Send chunk emails page: ${currentPage}, items: ${perPage}`)
	News.filterBySent(currentPage, perPage)
	.then(listNews => {
		listNews.forEach(news => {
			news.sent = true
			News.update(news)
			mailer.sendEmail(news)
		})
	})
	.catch(err => logger.error(err))
}

module.exports.startMailWorker = () => {
	schedule.scheduleJob('*/2 * * * *', () => {
		logger.info('Start mail worker')
		sendEmailTask()
	})
}

