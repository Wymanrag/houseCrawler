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
        //console.log('numb',numb, aparts)
        return aparts;
    })
    .catch(function (err) {
        // Crawling failed...
        console.log('Crawling failed', err)
    });
}

module.exports = crawler;