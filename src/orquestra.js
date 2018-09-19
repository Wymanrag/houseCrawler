global.config = require('../settings');
global.debug = true;

const crwalers = {
    imo : require('./crawlers/imovirtual'),
    //ide : require('./crawlers/puppeteer'),
    //tst : require('./crawlers/phantom'),
    //tst1 : require('./crawlers/phantom.1'),
    //tst2 : require('./crawlers/puppeteer')
    sap : require('./crawlers/sapo'),
    olx : require('./crawlers/olx'),
    era : require('./crawlers/era'),
    cju : require('./crawlers/custoJusto')
}
const dbase = require('./dbase')
const mailer = require('./mailer')

const urls = [
    {
        site: 'imo',
        urls: [
            'https://www.imovirtual.com/comprar/moradia/agueda/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bfilter_enum_rooms_num%5D%5B0%5D=1&search%5Bfilter_enum_rooms_num%5D%5B1%5D=2&search%5Bfilter_enum_rooms_num%5D%5B2%5D=3&search%5Bfilter_enum_rooms_num%5D%5B3%5D=4&search%5Bfilter_enum_rooms_num%5D%5B4%5D=5&search%5Bfilter_enum_rooms_num%5D%5B5%5D=6&search%5Bdescription%5D=1&search%5Border%5D=created_at_first%3Adesc&search%5Bcreated_since%5D=3&search%5Bsubregion_id%5D=1',
            'https://www.imovirtual.com/comprar/apartamento/agueda/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bfilter_enum_rooms_num%5D%5B0%5D=1&search%5Bfilter_enum_rooms_num%5D%5B1%5D=2&search%5Bfilter_enum_rooms_num%5D%5B2%5D=3&search%5Bfilter_enum_rooms_num%5D%5B3%5D=4&search%5Bfilter_enum_rooms_num%5D%5B4%5D=5&search%5Bfilter_enum_rooms_num%5D%5B5%5D=6&search%5Bdescription%5D=1&search%5Border%5D=created_at_first%3Adesc&search%5Bcreated_since%5D=3&search%5Bsubregion_id%5D=1',
            'https://www.imovirtual.com/comprar/apartamento/aveiro/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bfilter_enum_rooms_num%5D%5B0%5D=1&search%5Bfilter_enum_rooms_num%5D%5B1%5D=2&search%5Bfilter_enum_rooms_num%5D%5B2%5D=3&search%5Bfilter_enum_rooms_num%5D%5B3%5D=4&search%5Bfilter_enum_rooms_num%5D%5B4%5D=5&search%5Bfilter_enum_rooms_num%5D%5B5%5D=6&search%5Bdescription%5D=1&search%5Border%5D=created_at_first%3Adesc&search%5Bcreated_since%5D=3&search%5Bsubregion_id%5D=5',
            'https://www.imovirtual.com/comprar/moradia/aveiro/?search%5Bfilter_float_price%3Ato%5D=250000&search%5Bfilter_enum_rooms_num%5D%5B0%5D=1&search%5Bfilter_enum_rooms_num%5D%5B1%5D=2&search%5Bfilter_enum_rooms_num%5D%5B2%5D=3&search%5Bfilter_enum_rooms_num%5D%5B3%5D=4&search%5Bfilter_enum_rooms_num%5D%5B4%5D=5&search%5Bfilter_enum_rooms_num%5D%5B5%5D=6&search%5Bdescription%5D=1&search%5Border%5D=created_at_first%3Adesc&search%5Bcreated_since%5D=3&search%5Bsubregion_id%5D=5'
        ]
    },
    {
        site: 'sap',
        urls: [
            'https://casa.sapo.pt/Venda/Apartamentos~Moradias/T2-ate-T6-ou-superior/Aveiro/?sa=1&or=10',
            'https://casa.sapo.pt/Venda/Apartamentos~Moradias/T2-ate-T6-ou-superior/Agueda/?sa=1&or=10'
        ]
    },
    {
        site: 'olx',
        urls: [
            'https://www.olx.pt/imoveis/apartamento-casa-a-venda/apartamentos-venda/gloria/?search%5Bdescription%5D=1&search%5Bprivate_business%5D=private&search%5Border%5D=created_at%3Adesc',
            'https://www.olx.pt/imoveis/casas-moradias-para-arrendar-vender/gloria/?search%5Bdescription%5D=1&search%5Bprivate_business%5D=private&search%5Border%5D=created_at%3Adesc',
            'https://www.olx.pt/imoveis/casas-moradias-para-arrendar-vender/moradias-venda/agueda-agueda/?search%5Bdescription%5D=1&search%5Bprivate_business%5D=private&search%5Border%5D=created_at%3Adesc',
            'https://www.olx.pt/imoveis/apartamento-casa-a-venda/apartamentos-venda/agueda-agueda/?search%5Bdescription%5D=1&search%5Bprivate_business%5D=private&search%5Border%5D=created_at%3Adesc'
        ]
    },
    {
        site: 'era',
        urls: [
            'https://www.era.pt/imoveis/default.aspx?pg=1&o=1&t=1&a=&dd=01&cc=05&ff=01,15,05,17,13,10&z=&cp=&nq=2&p=&ar=&ca=00000000&ct=0000&or=41&idioma=pt',
            'https://www.era.pt/imoveis/default.aspx?pg=1&o=1&t=2&a=&dd=01&cc=05&ff=01,15,05,17,13,10&z=&cp=&nq=2&p=&ar=&ca=00000000&ct=0000&or=41&idioma=pt',
            'https://www.era.pt/imoveis/default.aspx?pg=1&o=1&t=2&a=&dd=01&cc=01&ff=21,24,25,26&z=&cp=&nq=2&p=&ar=&ca=00000000&ct=0000&or=41&idioma=pt',
            'https://www.era.pt/imoveis/default.aspx?pg=1&o=1&t=1&a=&dd=01&cc=01&ff=21,24,25,26&z=&cp=&nq=2&p=&ar=&ca=00000000&ct=0000&or=41&idioma=pt',
            'https://www.era.pt/imoveis/default.aspx?pg=1&o=1&t=&a=&dd=01&cc=10&ff=06&z=Praia%20Costa%20Nova,Praia%20da%20Barra&cp=&nq=0&p=&ar=&ca=00000000&ct=0000&or=41&idioma=pt'
        ]
    },
    {
        site: 'ide',
        urls: [
            'https://www.idealista.pt/comprar-casas/aveiro/com-preco-max_260000,t2,t3,t4-t5/?ordem=atualizado-desc',
            'https://www.idealista.pt/comprar-casas/agueda/com-preco-max_260000,t2,t3,t4-t5/?ordem=atualizado-desc'
        ]
    },
    {
        site: 'cju',
        urls: [
            'https://www.custojusto.pt/aveiro/aveiro/apartamentos-venda?ros=5',
            'https://www.custojusto.pt/aveiro/agueda/apartamentos-venda?ros=5',
            'https://www.custojusto.pt/aveiro/aveiro/moradias-venda?ros=5',
            'https://www.custojusto.pt/aveiro/agueda/moradias-venda?ros=5'
        ]
    }
]

let orquestra = {};

orquestra.main = function(req, res){

    console.log('Checking for apartments...')
    
    let promissesArray = [];
    promissesArray = orquestra.mapUrlsCrawlers(crwalers,urls);
  
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

/**
 * Iterates on an array of allowed sites object (and an array of urls) to fill in each crawler 
 * @param  {Object} crawlers object containing the suported crawlers
 * @param  {array} urls array of objects containig each supported site URLs
 * @returns {array} Returns an array of promises
 */
orquestra.mapUrlsCrawlers = function(crawlers, urls) {
    let promissesArray = [];
    crawlersLst = Object.keys(crawlers);
    
    urls.forEach((currKey)=>{
        if (crawlersLst.includes(currKey.site)){
            currKey.urls.forEach((url)=>{
                promissesArray.push(crwalers[currKey.site].crawl(url))
            })
        }
    })

    return promissesArray;
}

module.exports = orquestra;