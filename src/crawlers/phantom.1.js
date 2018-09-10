"use strict";
let driver = require('promise-phantom');
let options = {path: 'node_modules/phantomjs'};
let crawler = {};

crawler.crawl = function(url){
// Promise syntax
   driver.create(options)
    .then((phantom) => phantom.createPage())
    .then((page) => {
      return page.open('https://www.idealista.pt/comprar-casas/aveiro/com-preco-max_260000,t2,t3,t4-t5/?ordem=atualizado-desc')
        .then((status) => page.set('userAgent', 'userAgentStr asaaaaa/1.998'))
        .then(() => page.property('content'))
        .then((buffer) => console.log(buffer));
    })
    .catch(console.error.bind(console));
  }

  module.exports = crawler;