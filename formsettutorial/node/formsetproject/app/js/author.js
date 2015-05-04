var app = angular.module('authorApp',[],function($locationProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller('AuthorBooksEditCtrl', function ($scope, $location, $http) {
  var authorId = $location.path().split("/")[3]||"Unknown";

  $http({
    method: 'GET',
    url: '/api/v1/book/?format=json&limit=0',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  }).success(function (allbooksresponse) {
    $scope.allbooks = allbooksresponse.objects;
  });

  $http({
    method: 'GET',
    url: '/api/v1/author/' + authorId + '/',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  }).success(function (response) {
    $scope.author = response;
    $scope.authorbooks = response.books;

    $http({
      method: 'GET',
      url: '/api/v1/book_author/?format=json&limit=0',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    }).success(function (authorbooksresponse) {

      $scope.oldbooks = authorbooksresponse.objects.filter(
        function (abo) {return abo.author === $scope.author.resource_uri;
        });
        $scope.authorbooks = $scope.oldbooks.length === 0 ?
        [] : $scope.oldbooks.map(function (d) {return d.book; }).unique();
      });

      $scope.saveAuthor = function () {
        $http({
          method: 'PUT',
          url: '/api/v1/author/' + authorId + '/',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: $scope.author,
        }).success(function(data, status, headers, config) {
          //console.log("Updated author " + data.name);
        }).error(function(response, status) {
          console.log("Failed to update author " + status);
        });
      }

      $scope.saveAuthorBooks = function () {
        $scope.$watch('selected', function(nowSelected) {
          $scope.authorbooks = [];
          if(!nowSelected){
            return;
          }
          angular.forEach(nowSelected, function(val){
            $scope.authorbooks.push(val.id.toString());
          });
        });

        var author = $scope.author.resource_uri,
        books = $scope.authorbooks,
        objects = [],
        deleted_objects = [];

        /* Create objects for patch. */
        books.forEach(function (b) {
          /* Don't write existing relations. */
          if ($scope.oldbooks.map(function (obo) {return obo.book;}).indexOf(b) < 0) {
            objects.push({
              author: author,
              book: b
            });
          }
        });

        /* Create deleted_objects for patch. */
        $scope.oldbooks.forEach(function (obo) {
          if (books.indexOf(obo.book) < 0)
          deleted_objects.push(obo.resource_uri);
        });

        $http({
          method: 'PATCH',
          url: '/api/v1/book_author/',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {objects: objects, deleted_objects: deleted_objects, },
        }).success(function (response) {
          //console.log("updated books");
          window.location.href = "/authors";
        }).error(function (response,status) {
          console.log("Failed to update books " + status);
        });
      }
    });
  });

  app.directive("authorbooksData", function () {
    return {
      templateUrl: "/static/partials/authorbooks_template.html",
      restrict: "A"
    };
  });

  app.directive("authorData", function () {
    return {
      templateUrl: "/static/partials/author_template.html",
      restrict: "A"
    };
  });

  app.controller('NewAuthorCtrl', function ($scope, $location, $http) {
    $scope.save = function () {
      $http({
        method: 'POST',
        url: '/api/v1/author/',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: $scope.newAuthor,
      }).success(function(data, status, headers, config) {
        //console.log("Created new author " + data.name);
        window.location.href = "/authors";
      }).error(function(response, status) {
        console.log("Failed to create new author " + status);
      });
    }
  });
