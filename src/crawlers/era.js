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
    let baseUrl = 'https://www.era.pt';
    
    return rp(options)
    .then(function (htmlString) {
        let $ = cheerio.load(htmlString);

        let ref, price, topology, link, origin;

        $('td').each(function(i, elem){
            let data = $(this);
            if (data.attr('valign')){
                price = $(data).find('span.preco').children();
                let priceAnt =  $(data).find('span.preco_anterior').children().text();
                if (priceAnt){
                    price = $(data).find('span.preco_anterior').next().text();
                } else {
                    price =  $(price).text()
                }
                
                caracterstics = $(data).find('ul.bloco-caracteristicas').children()
                Object.keys(caracterstics).forEach(currKey => {
                    let blocoQ = $(caracterstics[currKey]).find('span.icon-imovel-quartos-mini').next().text()
                    if(blocoQ){
                        topology = blocoQ
                    }
                    let blocoA = $(caracterstics[currKey]).find('span.icon-imovel-area-mini').next().text()
                    if(blocoA){
                        area = blocoA
                    }
                })
                topology =`T${topology}`;
                title = $(data).find('div.tipo').text() + ' ' + topology;
                city = $(data).find('div.titulo').text();
                origin = 'Era';
                link = baseUrl + $($(data).find('div.blockLeft.img').children()[0]).attr('href')
                ref = link;
                jsonOutput = {ref, topology, price, link, origin, title, city, area};
                aparts.push(jsonOutput)

                //console.log('jsonOutput',jsonOutput)
            }
        })
        //console.log('numb', aparts.length)
        return aparts;
    })
    .catch(function (err) {
        // Crawling failed...
        console.log('Crawling failed', err)
    });
}

module.exports = crawler;