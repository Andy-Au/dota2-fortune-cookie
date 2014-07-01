'use strict';

var dota2Controllers = angular.module('dota2Controllers', []);

dota2Controllers.controller('FortuneController', [
	'$scope', 
	'$resource', 
	'$routeParams', function($scope, $resource, $routeParams) {

	$scope.cookieClicked = false;
	$scope.containerHidden = false;

	$scope.id = $routeParams.steamId;
	$scope.service = $resource('http://dota2fortunecookie.herokuapp.com/name=' + $scope.id);
	//$scope.service = $resource('http://localhost:5000/name=' + $scope.id);
	$scope.result = $scope.service.get();

	$scope.getFortune = function() {
		$scope.cookieClicked = true;
		$scope.service = $resource('http://dota2fortunecookie.herokuapp.com/getfortune=' + $scope.id);
		//$scope.service = $resource('http://localhost:5000/getfortune=' + $scope.id);
		$scope.message = $scope.service.get();
	};

	$scope.afterHide = function() {
		$scope.$apply(function() {
			$scope.containerHidden = true;
		});
		console.log('containerHidden = true!');
	}

	$scope.afterShow = function() {
		console.log('cookie has been shown~!');
	}
}]);