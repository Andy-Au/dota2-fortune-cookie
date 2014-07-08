'use strict';

var app  = angular.module('dota2Services', []);

app.factory('playerSummaryService', ['$resource', function($resource) {
	//return $resource('http://dota2fortunecookie.herokuapp.com/name=:steamId', 
	return $resource('http://localhost:5000/name=:steamId', 
		{
			steamId : '@steamId'
		});
}]);