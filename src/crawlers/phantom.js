var phantom = require('phantom');
var _ph, _page, _outObj;

let crawler = {};

crawler.crawl = function(){
    phantom
    .create()
    .then(ph => {
      _ph = ph;
      return _ph.createPage();
    })
    .then(page => {
      _page = page;
      return _page.open('https://www.idealista.pt/comprar-casas/aveiro/com-preco-max_260000,t2,t3,t4-t5/');
    })
    .then(status => {
      console.log(status);
      return _page.property('content');
    })
    .then(content => {
      console.log(content);
      _page.close();
      _ph.exit();
    })
    .catch(e => console.log(e));
}

module.exports = crawler;