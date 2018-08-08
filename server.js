const express   = require('express');
const app       = express();
const orquestra = require('./src/orquestra');

app.get('/scrape', orquestra.main);

app.listen('8081')
console.log('Magic happens on port 8081');

orquestra.main2();

exports = module.exports = app;
