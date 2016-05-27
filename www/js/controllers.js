angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $rootScope, jwtHelper, $localStorage) {
    var token = $localStorage.token;
    var tokenPayload = jwtHelper.decodeToken(token);

    console.log(tokenPayload);
  })

  .controller('UsersCtrl', function ($scope, $ionicLoading, $rootScope, $ionicPopup, $state, $localStorage, UsersService) {

    $rootScope.token = $localStorage.token;

    var url = $rootScope.url + '/list';

    $scope.logout = function () {
      $localStorage.logged = 0;
      $localStorage.token = null;
      window.location.href = "./index.html";
     };

    $scope.$on('$ionicView.enter', function (e) {
      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner> Loading...'
      });
      UsersService.all(url, $rootScope.token)
        .then(function (rows) {
          $scope.users = rows;
          $ionicLoading.hide();
        }, function (code) {
          $ionicLoading.hide();
          if (code == 0) {
            $ionicPopup.alert({
              title: 'เกิดข้อผิดพลาด',
              template: 'กรุณาล๊อกอินเข้าสู่ระบบใหม่อีกครั้ง'
            })
              .then(function (res) {
                $localStorage.logged = 0;
                $state.go('login', {}, {reload: true});
              });

          } else {
            $ionicPopup.alert({
              title: 'เกิดข้อผิดพลาด',
              template: 'เกิดข้อผิดพลาดในการเชื่อมต่อ'
            })
              .then(function () {
                $localStorage.logged = 0;
                window.location.href = "./index.html";
              });
          }

        });
    });
  })
  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
