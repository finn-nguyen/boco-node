const request = require('request')
const cheerio = require('cheerio')
const url = 'https://support.binance.com/hc/en-us/sections/115000202591-Latest-News'


request(url, (error, response, html) => {
  if (!error) {
    const $ = cheerio.load(html);
    $('a.article-list-link').each((index, element) => {
      console.log($(element).text())
    })
  } else {
    console.log(error)
  }
})



