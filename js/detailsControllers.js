'use strict';

var app = angular.module('detailControllers', []);

app.controller('DetailController', [
	'$scope', 
	'$resource', 
	'$routeParams', function($scope, $resource, $routeParams) {

	$scope.testmessage = 'TEST ANDY WAS HERE';

}]);