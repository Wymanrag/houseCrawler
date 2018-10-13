const rp      = require('request-promise');
const cheerio = require('cheerio');

const crawler = {};

crawler.crawl = function(url) {
    let jsonOutput = {};
    let aparts = [];
    let options = {
        url: url,
        headers: {
          'User-Agent': 'Some Test by Wymanrag v1 Instance/2347'
        }
      };
    let baseUrl = 'https://www.custojusto.pt';
    
    return rp(options)
    .then(function (htmlString) {
        let $ = cheerio.load(htmlString);

        let ref, price, topology, link, origin, image;

        $('div.col-md-9').children().each(function(i, elem){
            let data = $(this);
            let id = data.attr('id');
            if (id && id.match(/\d{8}/g)){
                ref = id; 
                link = data.attr('href')
                title = $(data).find('h2.words').text().trim();
                price = $(data).find('h5.pull-right').text().trim();
                city = $(data).find('span.hidden-xs').text().trim();
                area = '';
                topology = '';
                origin = 'Cju';
                image = $(data).find('img.img-responsive').attr('src') ||
                        $(data).find('img.img-responsive').attr('data-src');
                jsonOutput = {ref, topology, price, link, origin, title, city, area, image};
                aparts.push(jsonOutput) 
            };
                //console.log('jsonOutput',jsonOutput)
        });
        //console.log('numb', aparts.length)
        //throw new Error('Manual Stop')
        return aparts;
    })
    .catch(function (err) {
        // Crawling failed...
        console.log('Crawling failed', err)
    });
}

module.exports = crawler;