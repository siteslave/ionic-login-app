
angular.module('starter.login', [])
  .controller('LoginCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $localStorage, $rootScope, LoginService) {
    $scope.user = {};
    if ($localStorage.logged == 1) {
      $state.go('tab.dash');
    } else {
      $scope.doLogin = function () {
        // alert('login');
        if ($scope.user.username && $scope.user.password) {
          $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner> Loading...'
          });

          LoginService.login($rootScope.url, $scope.user.username, $scope.user.password)
            .then(function (token) {
              console.log(token);
              $localStorage.token = token;
              $localStorage.logged = 1;
              $ionicLoading.hide();
              $state.go('tab.dash');
            }, function (err) {
              $ionicLoading.hide();
              $ionicPopup.alert({
                title: 'เกิดข้อผิดพลาด',
                template: JSON.stringify(err)
              });
            });
        }
      };
    }
  })
  .factory('LoginService', function ($q, $http) {
    return {
      login: function (url, username, password) {
        var q = $q.defer();
        var _url = url + '/users/login';

        $http.post(_url, { username: username, password: password })
          .success(function (data) {
            if (data.ok) {
              q.resolve(data.token);
            } else {
              q.reject(data.msg);
            };
          })
          .error(function () {
            q.reject('Connection failed');
          });

        return q.promise;

      }
    }
  });
