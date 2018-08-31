const rp      = require('request-promise');
const cheerio = require('cheerio');

const crawler = {};

crawler.crawl = function(url) {
    let jsonOutput = {};
    let aparts = [];

    //url = 'https://www.imovirtual.com/comprar/apartamento/aveiro/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bdescription%5D=1';

    return rp(url)
    .then(function (htmlString) {
        let $ = cheerio.load(htmlString);

        //console.log('this $', $)

        let ref, price, topology, numb = 0, link, origin;

        $('article.offer-item').each(function(i, elem){
        let data = $(this);
        ref = data.attr('data-tracking-id');
        price = $(data).find('li.offer-item-price').text().trim();
        topology = $(data).find('li.offer-item-rooms').text();
        area = $(data).find('li.offer-item-area').text();
        title = $(data).find('span.offer-item-title').text();
        city = $(data).find('p.text-nowrap').text();
        city = city.split(':');
        city = city[1];
        link = data.attr('data-url');
        origin = 'Imo';
        jsonOutput = {ref, topology, price, link, origin, title, city, area};
        //console.log('area: ', area);
        numb +=1;
        aparts.push(jsonOutput)
        })
        //console.log('numb',numb, aparts)
        return aparts;
    })
    .catch(function (err) {
        // Crawling failed...
        console.log('Crawling failed', err)
    });
}

module.exports = crawler;