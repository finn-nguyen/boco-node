const mongoose = require('mongoose')
const logger = require('../../logger')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
	title: String,
	url: String,
	sent: Boolean,
	news_id: String
})

const News = mongoose.model('NewsModel', NewsSchema)

module.exports.create = (news_id, title, url, sent = false) => {
	News.findOne({ news_id: news_id })
		.then(result => {
			if (result == null) {
				const model = new News({ news_id, title, url, sent })
				model.save()
			} else {
				logger.info(`News with id ${news_id} already existed`)
			}
		})
		.catch(err => logger.error(err))
}

module.exports.findAll = () => {
	return News.find()
}

module.exports.filterBySent = (currentPage, perPage) => {
	return News.find({ sent: false }).skip(currentPage * perPage).limit(perPage)
}

module.exports.totalNewsNotSent = async() => {
	try {
		const result = await News.find({ sent: false })
		logger.info(`There are ${result.length} news that is not sent`)
		return result.length
	}
	catch (err) {
		logger.error(err)
		return 0
	}
}

module.exports.update = (model) => {
	News.update({ _id: model._id }, model)
		.then(result => logger.info('Update success'))
		.catch(err => logger.error(err))
}
