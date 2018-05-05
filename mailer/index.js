const config = require('../config/mailer')
const logger = require('../logger')
const nodeMailer = require('nodemailer')

const buildMailOptions = (title, url) => {
	return {
		from: 'Boco',
		to: process.env.RECEIVER,
		subject: 'Cryptorency news',
		text: 'You got a news',
		html: `<b>${title}</b><br />${url}`
	}
}

let transporter = null

const getTransporter = () => {
	if (transporter === null) {
		transporter = nodeMailer.createTransport(config)
	}
	return transporter
}

module.exports.sendEmail = (news) => {
	const mailOptions = buildMailOptions(news.title, news.url)
	const sender = getTransporter()
	sender.sendMail(mailOptions, (err, info) => {
		if (err) logger.error(err)
		else {
			logger.info(info)
		}
	})
}