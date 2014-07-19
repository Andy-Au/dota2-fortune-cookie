'use strict';

var app = angular.module('fortuneControllers', []);

app.controller('FortuneCtrl', [
	'$scope', 
	'$resource', 
	'$routeParams',
	'$location',
	'PlayerSummary',
	'getFortuneService', function(
		$scope, $resource, $routeParams, 
		$location, PlayerSummary, getFortuneService) {

	$scope.cookieClicked = false;
	$scope.containerHidden = false;

	$scope.id = $routeParams.steamId;
	$scope.result = PlayerSummary;

	$scope.getFortune = function() {
		$scope.cookieClicked = true;
	};

	$scope.afterHide = function() {
		$scope.$apply(function() {
			$scope.$parent.loading = true;
		});
		console.log('containerHidden = true!');

		$scope.message = getFortuneService.get({ steamId: $scope.id }, function() {
			console.log('fortune call done!');
			$scope.$parent.loading = false;
			$scope.containerHidden = true;
		});
	}

	$scope.afterShow = function() {
		console.log('cookie has been shown~!');
	}

	$scope.getDetails = function() {
		$scope.containerHidden = false;
		$location.path('/details/' + $scope.id);
	}
}]);


//The parent controller of the fortune page. 
//Purpose for the loading gif while waiting for async calls
app.controller("AppCtrl", function ($scope, $route, $location, $rootScope) {
	$scope.loading = true;

  	$rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
  		$scope.loading = true;
    	console.log('route changing! ' + $scope.loading);
  	});      
  	$rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
  		$scope.loading = false;
		console.log('route changed!');
  	});
});