const binanceUrl = 'https://support.binance.com/hc/en-us/sections/115000202591-Latest-News'

const binanceParser = require('../parsers/binanceParser')
const bot = require('../bots')

const websites = [
	{
		url: 'https://support.binance.com/hc/en-us/sections/115000202591-Latest-News',
		parser: binanceParser
	}
]

websites.forEach(site => bot.crawlData(site.url, site.parser))
