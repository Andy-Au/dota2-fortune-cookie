var express = require('express');
var logfmt = require('logfmt');
var request = require('request');
var apikey = require('./apikey');
var functions = require('./functions');
var steam = require('./steamFunctions');
var cors = require('cors');
var app = express();

app.use(logfmt.requestLogger());
app.use(cors());

app.get('/getfortune=:id', function(req, res) {
	steam.getMatchHistory(req.params.id, function(body) {
		functions.checkKills(body.result, req.params.id, function(response) {
			console.log('done! =>' + response);
			res.send(response);		
		});
	});
});

app.get('/name=:id', function(req, res) {
	steam.getPlayerSummary(req.params.id, function(result) {
		res.send(result);
	});
});

app.get('/details=:id', function(req, res) {
	steam.getMatchHistory(req.params.id, function(body) {
		
	});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  	console.log('Listening on ' + port);
});