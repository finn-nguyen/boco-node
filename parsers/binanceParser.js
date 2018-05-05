const cheerio = require('cheerio')
const baseUrl = 'https://support.binance.com'

const parseData = (html) => {
	const $ = cheerio.load(html)
	const result = []
	$('a.article-list-link').each((index, element) => {
		result.push({ title: $(element).text(), url: `${baseUrl}${$(element).attr('href')}`})
	})
	return result
}

module.exports = parseData