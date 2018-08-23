global.config = require('../settings');
const crwalers = {
    imo : require('./crawlers/imovirtual')
}
const dbase = require('./dbase')
const mailer = require('./mailer')

let orquestra = {};

orquestra.main = function(req, res){

    console.log('Let the Concert begin')

    //URL_IMO = 'https://www.imovirtual.com/comprar/apartamento/aveiro/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bdescription%5D=1';
    URL_IMO = 'https://www.imovirtual.com/comprar/apartamento/aveiro/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bfilter_enum_rooms_num%5D%5B0%5D=2&search%5Bdescription%5D=1&search%5Bcreated_since%5D=3';
    
    return crwalers.imo.crawl(URL_IMO)
    .then(function(result){
        if (!result.length){
            consolo.log('No results from IMO')
            return false;
        }
        if (res) {
            res.send(result)
            console.log('User asked for the Aparts')
            return true;
        }
        console.log('Debug-> Got ', result.length, ' Apartments')
        return dbase.insertHouses(result);
    })
    .then(function(result){
        console.log('Debug-> Went to DB an inserted ',result.length, ' new aparts')
        mailer.send();
        return true;
    })
    .catch(function(err){
        if(res){
            err => res.send(err);        
        }
        console.log('ERROR OCCURRED', err);
    })
  }

module.exports = orquestra;