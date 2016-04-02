angular.module('myApp')
      .controller('LogoutController', LogoutController);

LogoutController.$inject = ['$scope', '$location', 'AuthService']


function LogoutController($scope, $location, AuthService) {

    $scope.logout = function () {
      console.log('logging out')
      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        })
        .catch(function(err){
          console.log(err)
        });

    };
};
