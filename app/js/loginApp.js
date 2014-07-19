'use strict';

angular.module('loginApp', [
	'loginDirectives'
])

.controller('LoginController', ['$scope', function($scope) {
	$scope.indexMessage1 = 'What does a hero truly need?';
	$scope.indexMessage2 = 'A fortune cookie.';
}]);
