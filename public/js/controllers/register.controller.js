angular.module('myApp')
      .controller('RegisterController', RegisterController);

RegisterController.$inject = ['$scope', '$location', 'AuthService'];

function RegisterController($scope, $location, AuthService) {

    $scope.register = function(){

      //initial
      $scope.error = false;
      $scope.disabled = false;

      //
      AuthService.register($scope.registerForm.username, $scope. registerForm.password)
                  .then(function(response){
                    $location.path('/login');
                    $scope.disabled = false;
                    $scope.registerForm = {};
                  })
                  .catch(function(err){
                    $scope.error = true;
                    $scope.errorMessage = 'Something Went Wrong';
                    $scope.disabled = false;
                    $scope.registerForm = {};
                  });
    };
};
