var menuGameShow = function($rootScope, config, $http) {
	console.log("$rootScope : " + JSON.stringify($rootScope.securityDataUser));
};

angular
	.module('myApp')
	.directive('menuGameShow', ['$rootScope', 'config', '$http', menuGameShow]);