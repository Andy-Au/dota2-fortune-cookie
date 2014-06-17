var express = require('express');
var logfmt = require('logfmt');
var request = require('request');
var apikey = require('./apikey');
var functions = require('./functions');
var cors = require('cors');
var app = express();

app.use(logfmt.requestLogger());
app.use(cors());

app.get('/getfortune=:id', function(req, res) {
	functions.getMatchHistory(req.params.id, function(result) {
		functions.checkLastHits(result, req.params.id, function(result) {
			console.log('done! =>' + result);
			res.send(result);		
		});
	});
});

app.get('/name=:id', function(req, res) {
	functions.getPlayerSummary(req.params.id, function(result) {
		res.send(result);
	});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  	console.log('Listening on ' + port);
});