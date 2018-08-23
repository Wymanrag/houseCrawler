const express   = require('express');
const app       = express();
const orquestra = require('./src/orquestra');

app.get('/scrape', orquestra.main);

app.listen('8081');
console.log('Magic happens on port 8081');

const HOURS_3 = 10800000;
//execute main function even not requested by client
orquestra.main();
setInterval(orquestra.main, HOURS_3);

exports = module.exports = app;
