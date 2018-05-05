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
		News.create(news.news_id, news.title, news.url)
	})
}

module.exports.crawlData = crawlData

