const express   = require('express');
const app       = express();
const orquestra = require('./src/orquestra');

app.get('/scrape', orquestra.main);

app.listen('8081');
console.log('Magic happens on port 8081');

// ---- execute main function even not requested by client
let execTimer = 10800000; //ms -> 3 hours
//execTimer = 60000; //ms -> 1 minute - #uncoment for debug only
orquestra.main();
setInterval(orquestra.main, execTimer);

exports = module.exports = app;
