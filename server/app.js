var express = require('express');
var logfmt = require('logfmt');
var request = require('request');
var mongoose = require('mongoose');
var fs = require('fs');
var apikey = require('./apikey');
var functions = require('./functions');
var steam = require('./steamFunctions');
var cors = require('cors');
var app = express();

app.use(logfmt.requestLogger());
app.use(cors());

//db initalization
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL || apikey.dbUrl;

mongoose.connect(uristring, function (err, res) {
  	if (err) {
  		console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  	} else {
  		console.log ('Succeeded connected to: ' + uristring);
 	}
});

//load all files in model
fs.readdirSync(__dirname + '/model').forEach(function(filename) {
	if (~filename.indexOf('.js')) require(__dirname + '/model/' + filename);
});


//routes
app.get('/name=:id', function(req, res) {
	steam.getPlayerSummary(req.params.id, function(result) {
		res.send(result);
	});
});

app.get('/getfortune=:id', function(req, res) {
	steam.getMatchHistory(req.params.id, function(body) {
		functions.checkKills(body.result, req.params.id, function(response) {
			getMessage(mongoose.model('kills'), response.level, function(result) {
				res.send(JSON.stringify({
					message: result.message,
					id: 2,
					level: response.level
				}));
			});
		});
	});
});



app.get('/detail=:id/:fortuneId/:level', function(req, res) {
	console.log('getting details');
	steam.getMatchHistory(req.params.id, function(body) {
		if (req.params.fortuneId == 1) { //check lasthits
			console.log('getLastHitsDetail');
			functions.getLastHitsDetail(body.result, req.params.id, req.params.level, function(response) {
				res.send(JSON.stringify({
					message: response.message,
					data: response.data,
				}));
			});
		} else if (req.params.fortuneId == 2) { //check kills
			console.log('getKillsDetail');
			functions.getKillsDetail(body.result, req.params.id, req.params.level, function(response) {
				console.log('data=>' + response.data);
				res.send(JSON.stringify({
					message: response.message,
					data: response.data,
				}));
			});
		} else {
			res.send(JSON.stringify({
				message: 'something went crap.'
			}));
		}
	});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  	console.log('Listening on ' + port);
});

var getMessage = function(model, level, callback) {
	var rand = Math.random();
	model.findOne( { level: level, random : { $gte: rand } }, function(err, result) {
		if (result == null) {
			model.findOne( { level: level, random: { $lte: rand } }, function(err, result) {
				callback(result);
			});
		} else {
			callback(result);
		}
	});
};