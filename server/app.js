var express = require('express');
var logfmt = require('logfmt');
var request = require('request');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(logfmt.requestLogger());

app.get('/:id', function(req, res) {
  res.send('SteamID = ' + req.params.id);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});
