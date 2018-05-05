const mongoose = require('mongoose')
const logger = require('../../logger')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
	title: String,
	url: String,
	sent: Boolean
})

const News = mongoose.model('NewsModel', NewsSchema)

module.exports.create = (title, url, sent = false) => {
	const model = new News({ title, url, sent })
	return model.save()
}

module.exports.findAll = () => {
	return News.find()
}

module.exports.filterBySent = () => {
	return News.find({ sent: false }).limit(10)
}

module.exports.update = (model) => {
	News.update({ _id: model._id }, model)
		.then(result => logger.info('Update success'))
		.catch(err => logger.error(err))
}
