const express = require('express')
const app = express()
const logger = require('./logs')
const moment = require('moment')
const morgan = require('morgan')
const port = process.env.PORT || 8080

app.use(morgan('combined', { stream: logger.stream }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.listen(port, () => {
	console.log(`Server is running at ${port}`)
})
