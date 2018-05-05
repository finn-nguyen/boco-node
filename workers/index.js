const binanceUrl = 'https://support.binance.com/hc/en-us/sections/115000202591-Latest-News'

const db = require('../database')
const binanceParser = require('../parsers/binanceParser')
const bot = require('../bots')
const logger = require('../logger')

const websites = [
	{
		url: 'https://support.binance.com/hc/en-us/sections/115000202591-Latest-News',
		parser: binanceParser
	}
]

db.once('open', () => {
	logger.info('Starting crawl data')
	websites.forEach(site => bot.crawlData(site.url, site.parser))
})
