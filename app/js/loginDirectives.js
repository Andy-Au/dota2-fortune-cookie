angular.module('loginDirectives', [])

.directive('loginPicture', function () {
	return {
		restrict: 'E',
    	template: "<img src='css/images/fortunecookie.jpg'</img>"
  	};
});