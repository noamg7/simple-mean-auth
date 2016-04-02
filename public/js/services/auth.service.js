angular.module('myApp')
        .factory('AuthService', AuthService);

AuthService.$inject = ['$q', '$timeout', '$http'];

function AuthService($q, $timeout, $http) {
    var user = null;

    return {
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
    };

    function isLoggedIn(){
      if(user){
        return true;
      }else{
        return false;
      }
    }
    function getUserStatus(){
      $http.get('/user/status')
            .then(function(response){
              if(response.data.status){
                user = true;
              }else {
                user = false;
              }
            })
            .catch(function(err){
              user = false;
            });
    }
    function login(username, password){
      var deferred = $q.defer();
      $http.post('/user/login',
      {username: username, password: password})
      .then(function(response){
        if(response.data.status){
          user = true;
          deferred.resolve();
        }else {
          user = false;
          deferred.reject();
        }
      })
      .catch(function(err){
       user = false;
       deferred.reject();
     });
      return deferred.promise;
    }
    function logout(){
      var deferred = $q.defer();
      $http.get('/user/logout')
            .then(function(response){
              user = false;
              deferred.resolve();
            })
            .catch(function(err){
              user = false;
              deferred.reject(err);
            });
      return deferred.promise;
    }
    function register(username, password){
      var deferred = $q.defer();
      $http.post('/user/register',
      {username: username, password: password})
      .then(function(response){
        if(response.data.status){
          deferred.resolve()
        }else {
          deferred.reject();
        }
      })
      .catch(function(err){
        deferred.reject();
      });

      return deferred.promise;
    }

};
