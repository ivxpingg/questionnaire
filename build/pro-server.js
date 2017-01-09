var config = require('../config');
var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var router = require('./api/index');
var opn = require('opn');
var port = process.env.PORT || config.dev.port;

var proxyTable = config.dev.proxyTable;

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/', router);

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);

app.use(express.static('dist', {
    index: 'index.html'
}));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
