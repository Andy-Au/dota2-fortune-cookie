'use strict';

var dota2Controllers = angular.module('dota2Controllers', []);

dota2Controllers.controller('FortuneController', [
	'$scope', 
	'$resource', 
	'$routeParams',
	'summary', function($scope, $resource, $routeParams, summary) {

	$scope.cookieClicked = false;
	$scope.containerHidden = false;

	$scope.id = $routeParams.steamId;
	$scope.result = summary;

	$scope.getFortune = function() {
		$scope.cookieClicked = true;
		

		//$scope.service = $resource('http://dota2fortunecookie.herokuapp.com/getfortune=:steamId',
		$scope.service = $resource('http://localhost:5000/getfortune=:steamId',
			{
				steamId: '@steamId'
			});
		$scope.message = $scope.service.get({ steamId: $scope.id }, function() {
			console.log('fortune call done!');
			$scope.containerHidden = true;
			$scope.$parent.loading = false;
		});
	};

	$scope.afterHide = function() {
		$scope.$apply(function() {
			$scope.$parent.loading = true;
		});
		console.log('containerHidden = true!');
	}

	$scope.afterShow = function() {
		console.log('cookie has been shown~!');
	}
}]);


//The parent controller of the fortune page. 
//Purpose for the loading gif while waiting for async calls
dota2Controllers.controller("AppCtrl", function ($scope, $route, $location, $rootScope) {
	$scope.loading = true;

  	$rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
    	console.log('route changing! ' + $scope.loading);
  	});      
  	$rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
  		$scope.loading = false;
		console.log('route changed!');
  	});
});