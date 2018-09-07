const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
 
let crawler = {};
crawler.crawl = async (url) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      let userAgent = 'Some Test by Wymanrag v1 Instance/234';
      userAgent = debug ? userAgent += '0' : userAgent += '1';
      await page.setUserAgent(userAgent);
      await page.goto('https://www.idealista.pt/comprar-casas/aveiro/com-preco-max_260000,t2,t3,t4-t5/?ordem=atualizado-desc');
      //await page.screenshot({path: 'example.png'});
      user = await page.evaluate('navigator.userAgent');
      console.log('useruser',user)
      let bodyHTML = await page.evaluate(() => document.body.innerHTML);
      //console.log('aaaaaaaaaa',bodyHTML)
      await browser.close();
      baseUrl = 'www.idealista.pt';
      let $ = cheerio.load(bodyHTML);
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
                link = baseUrl + $(data).find('a.item-link').attr('href');
                origin = 'Idlsta';
                jsonOutput = {ref, topology, price, link, origin, title, city, area};
                
                if(jsonOutput.ref){
                    aparts.push(jsonOutput)
                }
                //console.log("DEEEEEEE",aparts)
              })
      return aparts;
    }; 


module.exports = crawler;