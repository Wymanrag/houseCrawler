const rp      = require('request-promise');
const cheerio = require('cheerio');

const crawler = {};

crawler.crawl = function(url) {
    let jsonOutput = {};
    let aparts = [];
    //console.log('URL', url)
    let options = {
        url: url,
        headers: {
          'User-Agent': 'Some Test by Wymanrag v1 Instance/234'
        }
      };
    let baseUrl = 'https://casa.sapo.pt';
    
    return rp(options)
    .then(function (htmlString) {
        let $ = cheerio.load(htmlString);

        //console.log('this $', $)

        let ref, price, topology, link, origin, image;

        $('div.searchResultProperty').each(function(i, elem){
            let data = $(this);
            title = $(data).find('p.searchPropertyTitle');
            title = $(title).find('span').text();
            price = $(data).find('div.searchPropertyPrice');
            price = $(price).find('span').text().trim();
            topology = title.split(' ')[1];
            area = $(data).find('div.searchPropertyInfo').find("p:contains('Área Útil')").next().text();
            city = $(data).find('p.searchPropertyLocation').text().trim();
            link = $(data).find('div.photoContainer');
            link = baseUrl + $(link).find('a.photoLayer').attr('href');
            origin = 'Sapo';
            ref = link;
            image = $(data).find('img').attr('data-original');
            jsonOutput = {ref, topology, price, link, origin, title, city, area, image};
            aparts.push(jsonOutput)
    
        })
        //console.log('numb',numb, aparts)
        //throw new Error('Manual Stop')
        return aparts;
    })
    .catch(function (err) {
        // Crawling failed...
        console.log('Crawling failed', err)
    });
}

module.exports = crawler;