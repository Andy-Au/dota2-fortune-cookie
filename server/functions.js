var request = require('request');
var async = require('async');
var apikey = require('./apikey');

var checkLastHits = function(body, playerId, TheCallback) {
	var object = body.result;
	var steamId32 = convertToSteamId32(playerId);
	var totalLastHits = 0;


	async.each(object.matches, function(match, callback) {
		getMatchDetails(match.match_id, function(details) {
			
			//TODO : find an alternative for grep, or just implement one yourself.
			//var player = $.grep(details.result.players, function(e) { return e.account_id == steamId32 });

			totalLastHits = totalLastHits + details.result.players[0].last_hits;
			callback();
		});
	}, function(err) {
		TheCallback(JSON.stringify(totalLastHits));
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
