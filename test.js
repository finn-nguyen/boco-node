const schedule = require('node-schedule')
console.log('Test node-schedule')
schedule.scheduleJob('*/3 * * * * *', () => {
	console.log('Schedule every 3s')
})
