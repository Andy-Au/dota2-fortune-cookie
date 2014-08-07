'use strict';

var app = angular.module('detailControllers', []);

app.controller('DetailCtrl', [
	'$scope', 
	'$resource', 
	'$routeParams',
	'DetailMessage',
	'PlayerSummary', function($scope, $resource, $routeParams, DetailMessage, PlayerSummary) {

	$scope.summary = PlayerSummary;
	$scope.message = DetailMessage.message;

}]);