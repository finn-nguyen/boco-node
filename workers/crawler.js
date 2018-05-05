const schedule = require('node-schedule')
const binanceParser = require('../parsers/binanceParser')
const bot = require('../bots')
const logger = require('../logger')
const constants = require('../constants')

const websites = [
	{
		url: constants.BINANCE_URL,
		parser: binanceParser
	}
]

module.exports.startCrawler = () => {
	schedule.scheduleJob('*/45 * * * * *', () => {
		logger.info('Start crawler')
		websites.forEach(site => bot.crawlData(site.url, site.parser))
	})
}
