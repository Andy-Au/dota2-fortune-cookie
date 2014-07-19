'use strict';

var app = angular.module('fortuneApp', [
	'ngResource',
	'ngAnimate',
	'ngRoute',
	'fortuneControllers',
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
        		controller: 'FortuneCtrl',
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
                controller: 'DetailCtrl',
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
            when('/oops', {
                templateUrl : 'partials/oops.html'
            }).
        	otherwise({
        		redirectTo: '/oops'
        	});
    }
]);

