angular.module('starter.services', [])

.factory('UsersService', function($q, $http) {
  // Might use a resource here that returns a JSON array

  return {
    all: function (url, token) {
      var q = $q.defer();
      $http.post(url, { token: token })
        .success(function (data) {
          if (data.ok) {
            q.resolve(data.rows);
          } else {
            q.reject(data.code)
          }
        })
        .error(function (data, status) {
          console.log(status);
          // 403 access denied
          q.reject(status);
        });

      return q.promise;
    },

  };
});
