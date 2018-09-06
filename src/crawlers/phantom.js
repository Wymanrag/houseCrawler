var phantom = require('phantom');
const cheerio = require('cheerio');
var _ph, _page, _outObj;

let crawler = {};

crawler.crawl = function(url){
  return new Promise(function(resolve, reject){
      phantom
      .create()
      .then(ph => {
        _ph = ph;
        return _ph.createPage(['--ignore-ssl-errors=yes', '--load-images=no']);
      })
      .then(page => {
        _page = page;
        let randomInstance = Math.random() * (5000) + 1000
        let userAgentStr = 'Some Test by Wymanrag v1 Instance/'// + Math.round(randomInstance);
        console.log('### Debug -> userAgentStr ', userAgentStr)
        _page.setting('userAgent', userAgentStr)
        return _page.open(url);
      })
      .then(status => {
        console.log(status);
        return _page.property('content');
      })
      .then(content => {
        console.log(content);
        let $ = cheerio.load(content);
  /*       topology = $('span.placeholder').text();
        console.log('LOADED CONTENT',topology); */
        let aparts = [];
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
            link = $(data).find('a.item-link').attr('href');
            origin = 'Idlsta';
            jsonOutput = {ref, topology, price, link, origin, title, city, area};
            
            if(jsonOutput.ref){
                aparts.push(jsonOutput)
            }
            console.log("DEEEEEEE",aparts)
          })
        _page.close();
        _ph.exit();
        return resolve(aparts);
      })
      .catch(e => reject(e));
  })  

}

module.exports = crawler;