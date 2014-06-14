angular.module('fortuneDirectives', ['ngAnimate'])

.directive('myShow', function ($animate) {
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