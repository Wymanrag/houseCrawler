const rp      = require('request-promise');
const cheerio = require('cheerio');
const crwalers = {
    imo : require('./crawlers/imovirtual')
}

let orquestra = {};

orquestra.main = function(req, res){

    console.log('Let the Concert begin')

    URL_IMO = 'https://www.imovirtual.com/comprar/apartamento/aveiro/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bdescription%5D=1';
    
    return crwalers.imo.crawl(URL_IMO)
    .then(function(result){
        if (res && result) {
            res.send(result)
            console.log('User asked for the Aparts')
        }
        else{
            console.log('RESULT', result, result.length)
        }
    })
    .catch(err => res.send(err))
  }

module.exports = orquestra;