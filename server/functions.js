var request = require('request');
var async = require('async');
var apikey = require('./apikey');

var checkLastHits = function(body, playerId, TheCallback) {
	var object = body.result;
	var steamId32 = convertToSteamId32(playerId);

	var totalLastHits = 0;
	var matches = 0;

	console.log('steam id in 32 bits => ' + steamId32);


	async.each(object.matches, function(match, callback) {
		getMatchDetails(match.match_id, function(details) {
			
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
			TheCallback(JSON.stringify({ message: "You are a last hitting God!" }));
		} else if (averageLastHits < 200 && averageLastHits > 100) {
			TheCallback(JSON.stringify({ message: "You are average at last hitting." }));
		} else {
			TheCallback(JSON.stringify({ message: "You are TRASH" }));
		}
	});
};

var getPlayerSummary = function(id, callback) {
	var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + apikey.apikey 
		+ '&steamids=' + id + '&format=json';
	request.get({url : url, json : true}, function(error, response, body) {
		callback(body);
	});
};

//GETS THREE MATCHES FOR NOW. 
//change matches_requested to desired amount of matches
var getMatchHistory = function(id, callback) { 
	var url = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?key=' + apikey.apikey 
		+ '&account_id=' + id + '&format=json&matches_requested=3';
	request.get({url : url, json : true}, function(error, response, body) {
		callback(body);
	});
};

function getMatchDetails (id, callback) {
	var url = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v001/?key=' + apikey.apikey
		+ '&match_id=' + id + '&format=json';
	request.get({url : url, json : true}, function(error, response, body) {
		callback(body);
	});
}

function convertToSteamId32(id) {
	return id.substr(3) - 61197960265728;
}

module.exports.checkLastHits = checkLastHits;
module.exports.getPlayerSummary = getPlayerSummary;
module.exports.getMatchHistory = getMatchHistory;
