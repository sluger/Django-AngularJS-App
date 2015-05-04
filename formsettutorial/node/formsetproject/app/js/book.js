var app = angular.module('bookApp',[],function($locationProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller('BookAuthorsEditCtrl', function ($scope, $location, $http) {
  var bookId = $location.path().split("/")[3]||"Unknown";

  $http({
    method: 'GET',
    url: '/api/v1/author/?format=json&limit=0',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  }).success(function (allauthorsresponse) {
    $scope.allauthors = allauthorsresponse.objects;
  });

  $http({
    method: 'GET',
    url: '/api/v1/book/' + bookId + '/',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  }).success(function (response) {
    $scope.book = response;
    $scope.bookauthors = response.books;

    $http({
      method: 'GET',
      url: '/api/v1/book_author/?format=json&limit=0',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    }).success(function (bookauthorsresponse) {

      $scope.oldauthors = bookauthorsresponse.objects.filter(
        function (bao) {return bao.book === $scope.book.resource_uri;
        });
        $scope.bookauthors = $scope.oldauthors.length === 0 ?
        [] : $scope.oldauthors.map(function (d) {return d.author; }).unique();
      });

      $scope.saveBook = function () {
        $http({
          method: 'PUT',
          url: '/api/v1/book/' + bookId + '/',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: $scope.book,
        }).success(function(data, status, headers, config) {
          //console.log("Updated book " + data.title);
          window.location.href = "/books";
        }).error(function(response, status) {
          console.log("Failed to updated book " + status);
        });
      }

      $scope.saveBookAuthors = function () {
        $scope.$watch('selected', function(nowSelected) {
          $scope.bookauthors = [];
          if(!nowSelected){
            return;
          }
          angular.forEach(nowSelected, function(val){
            $scope.bookauthors.push(val.id.toString());
          });
        });

        var book = $scope.book.resource_uri,
        authors = $scope.bookauthors,
        objects = [],
        deleted_objects = [];

        /* Create objects for patch. */
        authors.forEach(function (a) {
          /* Don't write existing relations. */
          if ($scope.oldauthors.map(function (oao) {return oao.book;}).indexOf(a) < 0) {
            objects.push({
              book: book,
              author: a
            });
          }
        });

        /* Create deleted_objects for patch. */
        $scope.oldauthors.forEach(function (oao) {
          if (authors.indexOf(oao.book) < 0)
          deleted_objects.push(oao.resource_uri);
        });

        $http({
          method: 'PATCH',
          url: '/api/v1/book_author/',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {objects: objects, deleted_objects: deleted_objects, },
        }).success(function (response) {
          //console.log("updated authors");
          window.location.href = "/books";
        }).error(function (response,status) {
          console.log("Failed to update authors " + status);
        });
      }
    });
  });

  app.directive("bookauthorsData", function () {
    return {
      templateUrl: "/static/partials/bookauthors_template.html",
      restrict: "A"
    };
  });

  app.directive("bookData", function () {
    return {
      templateUrl: "/static/partials/book_template.html",
      restrict: "A"
    };
  });

  app.controller('NewBookCtrl', function ($scope, $location, $http) {
    $scope.save = function () {
      $http({
        method: 'POST',
        url: '/api/v1/book/',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: $scope.newBook,
      }).success(function(data, status, headers, config) {
        //console.log("Created new book " + data.title);
        window.location.href = "/books";
      }).error(function(response, status) {
        console.log("Failed to create new book " + status);
      });
    }
  });
