'use strict';

var app = angular.module('fortuneApp', [
	'ngResource',
	'ngAnimate',
	'ngRoute',
    'angles',
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
            when('/detail=:steamId/:fortuneId/:level', {
                templateUrl: 'partials/details.html',
                controller: 'DetailCtrl',
                resolve: {
                    DetailMessage: function($route, getDetailService) {
                        return getDetailService.get(
                            {
                                steamId: $route.current.params.steamId,
                                fortuneId: $route.current.params.fortuneId,
                                level: $route.current.params.level,
                            }).$promise.then(function(data) {
                                return data;
                            });
                    },
                    PlayerSummary: function($route, playerSummaryService) {
                        return playerSummaryService.get(
                            {
                                steamId: $route.current.params.steamId,
                            }).$promise.then(function(data) {
                                return data;
                            });
                    },
                    Heroes: function(getHeroesService) {
                        return getHeroesService.query({}).$promise.then(function(data) {
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

