const cheerio = require('cheerio')

const parseData = (html) => {
	const $ = cheerio.load(html)
	const result = []
	$('a.article-list-link').each((index, element) => {
		result.push($(element).text())
	})
	return result
}

module.exports = parseData