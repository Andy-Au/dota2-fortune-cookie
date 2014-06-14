'use strict';

angular.module('fortuneApp', [
	'ngResource',
	'ngAnimate',
	'fortuneDirectives'
])

.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
])


.controller('FortuneController', ['$scope', '$resource', function($scope, $resource) {

	$scope.cookieClicked = false;
	$scope.containerHidden = false;

	$scope.userInit = function(id) {
		$scope.id = id;
		$scope.service = $resource('http://dota2fortunecookie.herokuapp.com');
		//$scope.service = $resource('http://localhost:5000/name=' + id);
		$scope.result = $scope.service.get();
	};	

	$scope.getFortune = function() {
		$scope.cookieClicked = true;
		$scope.mservice = $resource('http://dota2fortunecookie.herokuapp.com/');
		$scope.message = $scope.mservice.get();
	};

	$scope.afterHide = function() {
		$scope.$apply(function() {
			$scope.containerHidden = true;
		});
		console.log('containerHidden = true!');
	}
}]);
