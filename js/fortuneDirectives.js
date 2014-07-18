var app = angular.module('fortuneDirectives', ['ngAnimate']);

app.directive('myShow', function ($animate) {
	return {
		scope: {
			'myShow': '=',
			'afterHide': '&'
		},
		link: function(scope, element) {
			scope.$watch('myShow', function(newValue, oldValue) {
				if (newValue) {
					console.log('cookie has been clicked!');
					$animate.addClass(element, 'ng-hide', scope.afterHide);
				}
			});
		}
  	}
});

app.directive('myHide', function ($animate) {
	return {
		scope: {
			'myHide': '=',
			'afterShow': '&'
		}, 
		link: function(scope, element) {
			scope.$watch('myHide', function(newValue, oldValue) {
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