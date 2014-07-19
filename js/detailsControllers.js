'use strict';

var app = angular.module('detailControllers', []);

app.controller('DetailCtrl', [
	'$scope', 
	'$resource', 
	'$routeParams',
	'TestMessage', function($scope, $resource, $routeParams, TestMessage) {

	$scope.testmessage = 'TEST ANDY WAS HERE';
	$scope.message = TestMessage.message;

}]);