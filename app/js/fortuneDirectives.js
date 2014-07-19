var app = angular.module('fortuneDirectives', ['ngAnimate']);

app.directive('dotaShow', function($animate) {
	return {
		scope: {
			'dotaShow': '=',
			'afterHide': '&'
		},
		link: function(scope, element) {
			scope.$watch('dotaShow', function(newValue, oldValue) {
				if (newValue) {
					console.log('cookie has been clicked!');
					$animate.addClass(element, 'ng-hide', scope.afterHide);
				}
			});
		}
  	}
});

app.directive('dotaHide', function($animate) {
	return {
		scope: {
			'dotaHide': '=',
			'afterShow': '&'
		}, 
		link: function(scope, element) {
			scope.$watch('dotaHide', function(newValue, oldValue) {
				if (newValue) {
					console.log('showing cookie!');
					$animate.removeClass(element, 'ng-hide', scope.afterShow);				
				} else if (!newValue) {
					console.log('hiding cookie!');
					$animate.addClass(element, 'ng-hide');
				}
			});
		}
	}
});