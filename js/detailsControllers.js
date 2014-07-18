'use strict';

var app = angular.module('detailControllers', []);

app.controller('DetailController', [
	'$scope', 
	'$resource', 
	'$routeParams',
	'TestMessage', function($scope, $resource, $routeParams, TestMessage) {

	$scope.testmessage = 'TEST ANDY WAS HERE';
	$scope.message = TestMessage.message;

}]);