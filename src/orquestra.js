global.config = require('../settings');
global.debug = true;

const crwalers = {
    imo : require('./crawlers/imovirtual'),
    ide : require('./crawlers/puppeteer'),
    //tst : require('./crawlers/phantom'),
    //tst1 : require('./crawlers/phantom.1'),
    //tst2 : require('./crawlers/puppeteer')
    sap : require('./crawlers/sapo'),
    olx : require('./crawlers/olx'),
    era : require('./crawlers/era')
}
const dbase = require('./dbase')
const mailer = require('./mailer')

let orquestra = {};

orquestra.main = function(req, res){

    console.log('Checking for apartments...')
    //crwalers.tst.crawl();
    //crwalers.tst1.crawl();
    //crwalers.tst2.crawl();
    
    let promissesArray = [];

/*     let urlsIdealista = [
        'https://www.idealista.pt/comprar-casas/aveiro/com-preco-max_260000,t2,t3,t4-t5/?ordem=atualizado-desc',
        'https://www.idealista.pt/comprar-casas/agueda/com-preco-max_260000,t2,t3,t4-t5/?ordem=atualizado-desc'
    ];

    urlsIdealista.forEach(element => {
        promissesArray.push(crwalers.ide.crawl(element))
    }); */

    let urlsIMO = [
        'https://www.imovirtual.com/comprar/moradia/agueda/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bfilter_enum_rooms_num%5D%5B0%5D=1&search%5Bfilter_enum_rooms_num%5D%5B1%5D=2&search%5Bfilter_enum_rooms_num%5D%5B2%5D=3&search%5Bfilter_enum_rooms_num%5D%5B3%5D=4&search%5Bfilter_enum_rooms_num%5D%5B4%5D=5&search%5Bfilter_enum_rooms_num%5D%5B5%5D=6&search%5Bdescription%5D=1&search%5Border%5D=created_at_first%3Adesc&search%5Bcreated_since%5D=3&search%5Bsubregion_id%5D=1',
        'https://www.imovirtual.com/comprar/apartamento/agueda/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bfilter_enum_rooms_num%5D%5B0%5D=1&search%5Bfilter_enum_rooms_num%5D%5B1%5D=2&search%5Bfilter_enum_rooms_num%5D%5B2%5D=3&search%5Bfilter_enum_rooms_num%5D%5B3%5D=4&search%5Bfilter_enum_rooms_num%5D%5B4%5D=5&search%5Bfilter_enum_rooms_num%5D%5B5%5D=6&search%5Bdescription%5D=1&search%5Border%5D=created_at_first%3Adesc&search%5Bcreated_since%5D=3&search%5Bsubregion_id%5D=1',
        'https://www.imovirtual.com/comprar/apartamento/aveiro/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bfilter_enum_rooms_num%5D%5B0%5D=1&search%5Bfilter_enum_rooms_num%5D%5B1%5D=2&search%5Bfilter_enum_rooms_num%5D%5B2%5D=3&search%5Bfilter_enum_rooms_num%5D%5B3%5D=4&search%5Bfilter_enum_rooms_num%5D%5B4%5D=5&search%5Bfilter_enum_rooms_num%5D%5B5%5D=6&search%5Bdescription%5D=1&search%5Border%5D=created_at_first%3Adesc&search%5Bcreated_since%5D=3&search%5Bsubregion_id%5D=5',
        'https://www.imovirtual.com/comprar/moradia/aveiro/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bfilter_enum_rooms_num%5D%5B0%5D=1&search%5Bfilter_enum_rooms_num%5D%5B1%5D=2&search%5Bfilter_enum_rooms_num%5D%5B2%5D=3&search%5Bfilter_enum_rooms_num%5D%5B3%5D=4&search%5Bfilter_enum_rooms_num%5D%5B4%5D=5&search%5Bfilter_enum_rooms_num%5D%5B5%5D=6&search%5Bdescription%5D=1&search%5Border%5D=created_at_first%3Adesc&search%5Bcreated_since%5D=3&search%5Bsubregion_id%5D=5'
    ];

    urlsIMO.forEach(element => {
        promissesArray.push(crwalers.imo.crawl(element))
    });

    let urlsSapo = [
        'https://casa.sapo.pt/Venda/Apartamentos~Moradias/T2-ate-T6-ou-superior/Aveiro/?sa=1&or=10',
        'https://casa.sapo.pt/Venda/Apartamentos~Moradias/T2-ate-T6-ou-superior/Agueda/?sa=1&or=10'
    ];

    urlsSapo.forEach(element => {
        promissesArray.push(crwalers.sap.crawl(element))
    });

    let urlsOlx = [
        'https://www.olx.pt/imoveis/apartamento-casa-a-venda/apartamentos-venda/gloria/?search%5Bdescription%5D=1&search%5Bprivate_business%5D=private&search%5Border%5D=created_at%3Adesc',
        'https://www.olx.pt/imoveis/casas-moradias-para-arrendar-vender/gloria/?search%5Bdescription%5D=1&search%5Bprivate_business%5D=private&search%5Border%5D=created_at%3Adesc',
        'https://www.olx.pt/imoveis/casas-moradias-para-arrendar-vender/moradias-venda/agueda-agueda/?search%5Bdescription%5D=1&search%5Bprivate_business%5D=private&search%5Border%5D=created_at%3Adesc',
        'https://www.olx.pt/imoveis/apartamento-casa-a-venda/apartamentos-venda/agueda-agueda/?search%5Bdescription%5D=1&search%5Bprivate_business%5D=private&search%5Border%5D=created_at%3Adesc'
    ];

    urlsOlx.forEach(element => {
        promissesArray.push(crwalers.olx.crawl(element))
    });

    let urlsEra = [
        'https://www.era.pt/imoveis/default.aspx?pg=1&o=1&t=1&a=&dd=01&cc=05&ff=01,15,05,17,13,10&z=&cp=&nq=2&p=&ar=&ca=00000000&ct=0000&or=41&idioma=pt',
        'https://www.era.pt/imoveis/default.aspx?pg=1&o=1&t=2&a=&dd=01&cc=05&ff=01,15,05,17,13,10&z=&cp=&nq=2&p=&ar=&ca=00000000&ct=0000&or=41&idioma=pt',
        'https://www.era.pt/imoveis/default.aspx?pg=1&o=1&t=2&a=&dd=01&cc=01&ff=21,24,25,26&z=&cp=&nq=2&p=&ar=&ca=00000000&ct=0000&or=41&idioma=pt',
        'https://www.era.pt/imoveis/default.aspx?pg=1&o=1&t=1&a=&dd=01&cc=01&ff=21,24,25,26&z=&cp=&nq=2&p=&ar=&ca=00000000&ct=0000&or=41&idioma=pt'
    ];

    urlsEra.forEach(element => {
        promissesArray.push(crwalers.era.crawl(element))
    });


    return Promise.all(promissesArray)
    .then(function(result){
        result = [].concat(...result)
        let cleanedRes = orquestra.removeDuplicates(result);

        if (!result.length){
            console.log('No results from Crawlers')
            return false;
        }
        if (res) {
            res.send(result)
            console.log('User asked for the Aparts')
            return true;
        }
        console.log('Debug-> Got', cleanedRes.length, 'Apartments')
        return dbase.insertHouses(cleanedRes);
    })
    .then(function(result){
        console.log('Debug-> Went to DB an inserted/updated', result.length, 'aparts')
        if(!debug){
            mailer.send();
        }

        return true;
    })
    .catch(function(err){
        if(res){
            err => res.send(err);        
        }
        console.log('ERROR OCCURRED', err);
    })
  }
  /**
   * Iterates on an array and filters duplicated objects
   * @param  {Array} arr array of objects to iterate
   */
  orquestra.removeDuplicates = function(arr) {

        return arr.filter((elem, index, self) =>
            index === self.findIndex((t) => (
                t.origin === elem.origin && t.ref === elem.ref
            ))
        );
  }

module.exports = orquestra;