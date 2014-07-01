'use strict';

var app = angular.module('fortuneApp', [
	'ngResource',
	'ngAnimate',
	'ngRoute',
	'dota2Controllers',
	'fortuneDirectives'
])

.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider.
        	when('/message/:steamId', {
        		templateUrl: 'partials/message.html',
        		controller: 'FortuneController',
        		//resolve : FortuneController.loadData
        	}).
        	otherwise({
        		redirectTo: '/message'
        	});
    }
]);

