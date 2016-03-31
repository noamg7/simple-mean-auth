angular.module('myApp', ['ngRoute']);

angular.module('myApp')
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'html/views/home.html',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl: 'html/views/login.html',
      controller: 'LoginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'LogoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'html/views/register.html',
      controller: 'RegisterController',
      access: {restricted: false}
    })
    .otherwise({
      redirectTo: '/login'
    });
});

angular.module('myApp')
.run(function ($rootScope, $location, $route, AuthService) {
  //What is this run thing?
  $rootScope.$on('$routeChangeStart', function(event, next, current){
    AuthService.getUserStatus();
    if(next.access.restricted && !AuthService.isLoggedIn()){
      $location.path('/login')
      $route.reload(); //telling the router there has been a change
    }
  });
});
