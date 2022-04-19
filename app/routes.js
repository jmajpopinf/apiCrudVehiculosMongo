var app =  angular.module('main-App',['ngRoute', 'chart.js']);

app.run(function($location) {
	var userLocal = localStorage.getItem('usuario')
	console.log(userLocal);
   if(userLocal) {
		//$location.path('/home');
   	}else{
		localStorage.removeItem('usuario');
		$location.path('/login');
	   }
 });
 

app.config(function($routeProvider) {
        $routeProvider
			.when('/home', {
	            templateUrl: 'templates/posts.html',
	            controller: 'PostController'
	        })
			.when('/login', {
	            templateUrl: 'templates/login.html',
	            controller: 'loginController'
	        })
			.when('/register', {
	            templateUrl: 'templates/register.html',
	            controller: 'registerController'
	        })
			.when('/', {
				templateUrl: 'templates/login.html',
				controller: 'loginController'
			})
			.when('/reporteVendidos', {
				templateUrl: 'templates/reporteVendidos.html',
				controller: 'reportController'
			})
			.when('/reporteComprados', {
				templateUrl: 'templates/reporteComprados.html',
				controller: 'compradosController'
			})
			.when('/reporteCaros', {
				templateUrl: 'templates/reporteCaros.html',
				controller: 'carosController'
			});
});

