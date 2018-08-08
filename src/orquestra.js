const rp      = require('request-promise');
const cheerio = require('cheerio');

let orquestra = {};

orquestra.main = function(req, res){

  console.log('Let the Concert begin')

  let jsonOutput = { title : "", release : "", rating : ""};

  url = 'http://www.imdb.com/title/tt1229340/';

  rp(url)
    .then(function (htmlString) {
      let $ = cheerio.load(htmlString);

      console.log('this $', $)

      let title, release, rating;
  
      $('.title_wrapper').filter(function(){
        let data = $(this);
        //console.log('data $', data.children().first().text())
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

      if (res) {res.send(jsonOutput)}
    })
    .catch(function (err) {
        // Crawling failed...
      console.log('Crawling failed', err)
    });
}

orquestra.main2 = function(req, res){

    console.log('Let the Concert begin')
  
    let jsonOutput = {};
    let aparts = [];
  
    url = 'https://www.imovirtual.com/comprar/apartamento/aveiro/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bdescription%5D=1';
  
    rp(url)
      .then(function (htmlString) {
        let $ = cheerio.load(htmlString);
  
        console.log('this $', $)
  
        let ref, price, topology, numb = 0, link;
    
        $('article.offer-item').each(function(i, elem){
          let data = $(this);
          ref = data.attr('data-tracking-id');
          price = $(data).find('li.offer-item-price').text().trim();
          topology = $(data).find('li.offer-item-rooms').text();
          link = data.attr('data-url')
          jsonOutput = {ref, topology, price, link}
          //console.log('obj: ', jsonOutput);
          numb +=1;
          aparts.push(jsonOutput)
        })
        console.log('numb',numb, aparts)
        if (res) {res.send(jsonOutput)}
        else{return aparts}
      })
      .catch(function (err) {
          // Crawling failed...
        console.log('Crawling failed', err)
      });
  }

module.exports = orquestra;