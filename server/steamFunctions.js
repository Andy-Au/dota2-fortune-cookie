/*
This is where all the steam api related functions go. 
Each of these simply makes a steam api call for things such as getting a player's match history.

Also includes convertToSteamId32 function, it is used to convert the steamId obtained from GetPlayerSummary into the 32bit version that is used everywhere else

Each takes in 2 parameters =>  1). id - players steamId (64 bit version works as params of the api calls)
							   2). callback - callback function to return the response JSON object from the api call

*/


var request = require('request');
var async = require('async');
var apikey = require('./apikey');

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


module.exports.getPlayerSummary = getPlayerSummary;
module.exports.getMatchHistory = getMatchHistory;
module.exports.getMatchDetails = getMatchDetails;
module.exports.convertToSteamId32 = convertToSteamId32;