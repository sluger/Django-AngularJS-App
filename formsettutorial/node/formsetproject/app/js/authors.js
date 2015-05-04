var app = angular.module('authorsApp',[]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.controller('AuthorsCtrl', function ($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/v1/author/?format=json&limit=0',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  }).success(function (response) {
    $scope.authorlist = response.objects;
  });

  $scope.edit = function (authorId) {
    $http({
      method: 'GET',
      url: '/api/v1/author/' + authorId + '/',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    }).success(function (response) {
      //console.log("Updated author ");
      window.location.href = "/authors/edit/" + authorId;
    }).error(function(response, status) {
      console.log("Failed to redirect to author edit page " + status);
    });
  }

  $scope.delete = function (authorId) {
    $http({
      method: 'DELETE',
      url: '/api/v1/author/' + authorId + '/',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    }).success(function(data, status, headers, config) {
      //console.log("Deleted author " + data.name);
      window.location.href = "/authors";
    }).error(function(response, status) {
      console.log("Failed to delete author " + status);
    });
  }
});

app.directive("authorsData", function () {
  return {
    templateUrl: "/static/partials/authors_template.html",
    restrict: "A"
  };
});
