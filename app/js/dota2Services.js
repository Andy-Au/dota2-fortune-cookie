'use strict';

var app  = angular.module('dota2Services', []);

app.factory('playerSummaryService', ['$resource', function($resource) {
	//return $resource('http://dota2fortunecookie.herokuapp.com/name=:steamId', 
	return $resource('http://localhost:5000/name=:steamId', 
	{
		steamId : '@steamId'
	});
}]);

app.factory('getFortuneService', ['$resource', function($resource) {
	//return $resource('http://dota2fortunecookie.herokuapp.com/getfortune=:steamId',
	return $resource('http://localhost:5000/getfortune=:steamId',
	{
		steamId: '@steamId'
	});
}]);

app.factory('getDetailService', ['$resource', function($resource) {
	//return $resource('http://dota2fortunecookie.herokuapp.com/detail=:steamId/:fortuneId/:level', 
	return $resource('http://localhost:5000/detail=:steamId/:fortuneId/:level',	
	{
		steamId: '@steamId',
		fortuneId: '@fortuneId',
		level: '@level',
	});
}]);