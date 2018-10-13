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
    let baseUrl = 'https://casa.olx.pt';
    
    return rp(options)
    .then(function (htmlString) {
        let $ = cheerio.load(htmlString);

        let ref, price, topology, link, origin, image;
        nrAnuncios = $('div.dontHasPromoted').find('h2').text();
        nrAnuncios=nrAnuncios.split(' ')[1];

        $('tr.wrap').each(function(i, elem){
            if(i<nrAnuncios){
                let data = $(this);
                obj = data.attr('data-features')
                if(obj){
                    obj = JSON.parse(obj)
                }
                title = $(data).find('a.marginright5').text().trim();
                price = $(data).find('p.price').text().trim();
                topology = '';
                area = '';
                city = $(data).find('p.lheight16').find('span').first().text().trim();
                link = $(data).find('a.marginright5').attr('href');
                origin = 'Olx';
                ref =  $(data).find('table.fixed').attr('data-id');
                image = $(data).find('img.fleft').attr('src');
                jsonOutput = {ref, topology, price, link, origin, title, city, area, image};
                aparts.push(jsonOutput)
            }
        })
        //throw new Error('Manual Stop')
        return aparts;
    })
    .catch(function (err) {
        // Crawling failed...
        console.log('Crawling failed', err)
    });
}

module.exports = crawler;