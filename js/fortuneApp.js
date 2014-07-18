'use strict';

var app = angular.module('fortuneApp', [
	'ngResource',
	'ngAnimate',
	'ngRoute',
	'dota2Controllers',
    'detailControllers',
    'dota2Services',
	'fortuneDirectives'
])

.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider.
        	when('/message/:steamId', {
        		templateUrl: 'partials/message.html',
        		controller: 'FortuneController',
        		resolve: {
                    PlayerSummary: function($route, playerSummaryService) {
                        return playerSummaryService.get(
                            {
                                steamId: $route.current.params.steamId
                            }).$promise.then(function(data) {
                                return data;
                            });
                    }
                }
        	}).
            when('/details/:steamId', {
                templateUrl: 'partials/details.html',
                controller: 'DetailController',
                resolve: {
                    TestMessage: function($route, getFortuneService) {
                        return getFortuneService.get(
                            {
                                steamId: $route.current.params.steamId
                            }).$promise.then(function(data) {
                                return data;
                            });
                    }
                }
            }).
        	otherwise({
        		redirectTo: '/message'
        	});
    }
]);

