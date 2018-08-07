const express = require('express');
const fs      = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://www.imdb.com/title/tt1229340/';

  request(url, function(error, response, html){

    let jsonOutput = { title : "", release : "", rating : ""};

    if(!error){
      let $ = cheerio.load(html);
      
      console.log('this $', $)

      let title, release, rating;
  
      $('.title_wrapper').filter(function(){
        let data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        jsonOutput.title = title;
        jsonOutput.release = release;
      })

      $('.ratingValue').filter(function(){
        let data = $(this);
        rating = data.text().trim();

        jsonOutput.rating = rating;
      })
    }

    fs.writeFile('output.json', JSON.stringify(jsonOutput, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
