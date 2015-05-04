var app = angular.module('booksApp',[])

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.controller('BooksCtrl', function ($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/v1/book/?format=json&limit=0',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  }).success(function (response) {
    $scope.booklist = response.objects;
  });

  $scope.edit = function (bookId) {
    $http({
      method: 'GET',
      url: '/api/v1/book/' + bookId + '/',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    }).success(function (response) {
      //console.log("Updated book ");
      window.location.href = "/books/edit/" + bookId;
    }).error(function(response, status) {
      console.log("Failed to redirect to book edit page " + status);
    });
  }

  $scope.delete = function (bookId) {
    $http({
      method: 'DELETE',
      url: '/api/v1/book/' + bookId + '/',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    }).success(function(data, status, headers, config) {
      //console.log("Deleted book " + data.name);
      window.location.href = "/books";
    }).error(function(response, status) {
      console.log("Failed to delete book " + status);
    });
  }
});

app.directive("booksData", function () {
  return {
    templateUrl: "/static/partials/books_template.html",
    restrict: "A"
  };
});
