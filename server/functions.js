/*
This is where all the data analysis logic's at.

it makes use of the steam api functions (getMatchDetails etc)

Each of these takes in 3 parameters: 1). body - the JSON object returned from getMatchHistory
									 2). playerId - steamId from getPlayerSummary (must change to 32bit version)
									 3). TheCallback - the callback function that will be called at the end after 
									  	 all the async methods are completed and returns the message back to app.js
*/

var request = require('request');
var async = require('async');
var mongoose = require('mongoose');
var apikey = require('./apikey');
var steam = require('./steamFunctions');

var checkLastHits = function(body, playerId, TheCallback) {
	var steamId32 = steam.convertToSteamId32(playerId);

	var totalLastHits = 0;
	var matches = 0;

	console.log('steam id in 32 bits => ' + steamId32);


	async.each(body.matches, function(match, callback) {
		steam.getMatchDetails(match.match_id, function(details) {
			
			var player = details.result.players.filter(function(e) {
				return e.account_id === steamId32;
			});

			console.log('player = ' + player[0].account_id + 'lasthit = ' + player[0].last_hits);

			totalLastHits = totalLastHits + player[0].last_hits;
			matches = matches + 1;

			callback();

		});
	}, function(err) {
		console.log('total matches = ' + matches);
		console.log('total lastHits = ' + totalLastHits);

		var averageLastHits = totalLastHits / matches;

		console.log('average lasthits = ' + averageLastHits);

		var level = 0;
		if (averageLastHits > 200) {
			level = 2;
		} else if (averageLastHits < 200 && averageLastHits > 100) {
			level = 1;
		}

		TheCallback(JSON.stringify({
			totalLastHits: totalLastHits,
			averageLastHits: averageLastHits,
			matches: matches,
			id: 1,
			level: level
		}));
	});
};

//Potentially make checkKills return a 'checkKillsResponse' object
//make this more OOP
var checkKills = function(body, playerId, TheCallback) {
	var steamId32 = steam.convertToSteamId32(playerId);

	var totalKills = 0;
	var matches = 0;

	async.each(body.matches, function(match, callback) {
		steam.getMatchDetails(match.match_id, function(details) {
			var player = details.result.players.filter(function(e) {
				return e.account_id === steamId32;
			});

			console.log('player = ' + player[0].account_id + 'kills = ' + player[0].kills);

			totalKills = totalKills + player[0].kills;
			matches = matches + 1;

			callback();

		});
	}, function(err) {
		console.log('total matches = ' + matches);
		console.log('total kills = ' + totalKills);

		var averageKills = totalKills / matches;

		console.log('average kills = ' + averageKills);

		var level = 1;
		if (averageKills > 10) {
			level = 3;
		} else if (averageKills < 10 && averageKills > 4) {
			level = 2;
		}

		TheCallback(JSON.stringify({
			totalKills: totalKills,
			averageKills: averageKills,
			matches: matches,
			id: 2,
			level: level
		}));
	});
};

var getKillsDetail = function(body, playerId, level, TheCallback) {
	var message = '';

	checkKills(body, playerId, function(result) {
		
		var obj = JSON.parse(result);
		var totalKills = obj.totalKills;
		var averageKills = obj.averageKills;
		var matches = obj.matches;

		//get generic messages
		getMessage(mongoose.model('killdetails'), 0, function(genericResult) {
			message = String.format(genericResult.message, averageKills, matches);
			getMessage(mongoose.model('killdetails'), level, function(result) {
				message = message + result.message;
				TheCallback(JSON.stringify({
					message: message,
				}));
			});
		});
	});
};

var getLastHitsDetail = function(body, playerId, level, TheCallback) {
	TheCallback(JSON.stringify({
		message: 'test',
	}));
};

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

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  };
}

module.exports.checkLastHits = checkLastHits;
module.exports.checkKills = checkKills;

module.exports.getKillsDetail = getKillsDetail;
module.exports.getLastHitsDetail = getLastHitsDetail;

module.exports.getMessage = getMessage;