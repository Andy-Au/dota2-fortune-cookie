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

		if (averageLastHits > 200) {
			TheCallback(JSON.stringify({
				message: 'You are a last hitting God!',
				id: 1
			}));
		} else if (averageLastHits < 200 && averageLastHits > 100) {
			TheCallback(JSON.stringify({
				message: 'You are average at last hitting. JK TRASHHHHHHH.',
				id: 1
			}));
		} else {
			TheCallback(JSON.stringify({
				message: 'You are TRASH',
				id: 1
			}));
		}
	});
};

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

		if (averageKills > 10) {
			TheCallback(JSON.stringify({
				message: 'You are a hero slayer!',
				id: 2
			}));
		} else if (averageKills < 10 && averageKills > 4) {
			TheCallback(JSON.stringify({
				message: 'You are not that great at ksing eh?',
				id: 2
			}));
		} else {
			TheCallback(JSON.stringify({
				message: 'You are allergic to kills eh?',
				id: 2
			}));
		}
	});
};

var getKillsDetail = function(body, playerId, TheCallback) {
	TheCallback(JSON.stringify({
		message: 'You have been the crappiest kser of all time. This is a paragraph to explain why you suck so much'
	}));
};

var getLastHitsDetail = function(body, playerId, TheCallback) {
	TheCallback(JSON.stringify({
		message: 'You can not last hit for your life. This a paragraph to explain how bad you are at this game.'
	}));
};

module.exports.checkLastHits = checkLastHits;
module.exports.checkKills = checkKills;

module.exports.getKillsDetail = getKillsDetail;
module.exports.getLastHitsDetail = getLastHitsDetail;