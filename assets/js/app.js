var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){

	$routeProvider
   	.when('/', {
    	templateUrl: 'templates/home.html',
    	controller: 'mainController',
  	})
   	.when('/items', {
    	templateUrl: 'templates/items.html',
    	controller: 'secondController',
  	})
    .otherwise({redirectTo:'/'});

});


myApp.controller('mainController', ['$scope', '$location', '$log', function ($scope, $location, $log){
   
    
	$scope.nome = 'Cristian';

}]);
myApp.controller('secondController', ['$scope', '$location', '$log','$http', function ($scope, $location, $log, $http){
    
    $scope.frmToggle = function() {
		$('#blogForm').slideToggle();
	}
    
    $http.get('welcome/get').
    success(function(data) {
        $scope.posts = data;
    }).
    error(function(data, status) {
      $log.error(status);
    });
    
    // create new product 
    $scope.criarPost = function(){
         
        // fields in key-value pairs
        $http.post('welcome/post', 
            {
                'title' : $scope.title, 
                'description' : $scope.description
            }
        ).success(function (data) {
            $scope.posts = data;
        });
    }

}]);
	