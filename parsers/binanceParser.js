const cheerio = require('cheerio')
const constants = require('../constants')

const getNewsId = (url) => {
	const path = url.split('/').pop()
	const id = path.split('-').shift()
	return id
}

const parseData = (html) => {
	const $ = cheerio.load(html)
	const result = []
	$('a.article-list-link').each((index, element) => {
		const url = `${constants.BINANCE_BASE_URL}${$(element).attr('href')}`
		result.push({
			title: $(element).text(),
			url: url,
			news_id: getNewsId(url)
		})
	})
	return result
}

module.exports = parseData