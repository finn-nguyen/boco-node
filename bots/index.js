const request = require('request')
const logger = require('../logger')
const News = require('../models/news')

const crawlData = (url, parser) => {
	request(url, (error, response, html) => {
		if (!error) {
		  const data = parser(html)
		  saveToDatabase(data)
  	} else {
    	logger.error(error)
  	}
	})
}

const saveToDatabase = (listNews) => {
	listNews.forEach(news => {
		News.create(news.title, news.url)
			.then(model => {
				logger.info(`Save to database success: {title: ${model.title}, url: ${model.url}, sent: ${model.sent}}`)
			})
			.catch(err => logger.error(err))
	})
}

module.exports.crawlData = crawlData

