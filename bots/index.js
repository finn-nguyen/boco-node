const request = require('request')
const db = require('../database')
const logger = require('../logger')

const crawlData = (url, parser) => {
	request(url, (error, response, html) => {
		if (!error) {
		  const data = parser(html)
		  console.log(data)
  	} else {
    	logger.error(error)
  	}
	})
}

module.exports.crawlData = crawlData

