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
                    summary: function($route, playerSummaryService) {
                        return playerSummaryService.get(
                            {
                                steamId: $route.current.params.steamId
                            }).$promise.then(function(data) {
                                return data;
                            });
                    }
                }
        	}).
            when('/details', {
                templateUrl: 'partials/details.html',
                controller: 'DetailController',
            }).
        	otherwise({
        		redirectTo: '/message'
        	});
    }
]);

