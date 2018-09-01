const rp      = require('request-promise');
const cheerio = require('cheerio');

const crawler = {};

crawler.crawl = function(url) {
    let jsonOutput = {};
    let aparts = [];
    let options = {
        url: url,
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
        },
        rejectUnauthorized: false
      };
    baseUrl = 'www.idealista.pt';
    
    return rp(options)
    .then(function (htmlString) {
        let $ = cheerio.load(htmlString);
        //console.log('this $', $)

        let ref, price, topology, link, origin;
        $('article').each(function(i, elem){
            let data = $(this);
            title = $(data).find('a.item-link').text();
            ref = $(data).children().attr('data-adid');
            price = $(data).find('span.item-price').text().trim();
            container = $(data).find('div.item-info-container')
            topology = $(container.find('span.item-detail')[0]).text();
            area = $(container.find('span.item-detail')[1]).text();
            area = area.split(' ');
            area = `${area[0]} ${area[1]}`;
            city = '';
            link = baseUrl + $(data).find('a.item-link').attr('href');
            origin = 'Idlsta';
            jsonOutput = {ref, topology, price, link, origin, title, city, area};
            
            if(jsonOutput.ref){
                aparts.push(jsonOutput)
            }
        })
        return aparts;
    })
    .catch(function (err) {
        // Crawling failed...
        console.log('Crawling failed', err)
    });
}

module.exports = crawler;