angular.module("quizzer").controller("CategoryController", CategoryController);

function CategoryController($scope, categoryService, categories, $modal, $state) {
  $scope.categories = categories.categories;
  $scope.currentPage = 1;
  $scope.numPerPage = 10;
  $scope.maxSize = 5;
  $scope.totalItems = categories.meta.total_count;

  $scope.pageChanged = function () {
    params = {
      page: $scope.currentPage - 1, // offset
      page_size: $scope.numPerPage,
      keywords: $scope.searchTerm
    };

    categoryService.getAllCategories(params)
      .then(function(response) {
        $scope.categories = response.data.categories;
        $scope.totalItems = response.data.meta.total_count;
    });
  };

  // Display the number in the pagination
  // e.g. Showing X to 100
  $scope.showFrom = function () {
    var number = 0;

    if ($scope.categories.length > 0) {
      number = ($scope.currentPage * $scope.numPerPage) - $scope.numPerPage + 1
    }

    return number;
  };

  // Display the number in the pagination
  // e.g. Showing 1 to Y
  $scope.showTo = function() {
    var number = $scope.currentPage * $scope.numPerPage;

    if ($scope.categories.length < $scope.numPerPage) {
      number = $scope.categories.length;
    }

    return number;
  };

  $scope.$watch("numPerPage", function() {
    $scope.currentPage = 1;
    $scope.pageChanged();
  });

  $scope.clearSearch = function() {
    $scope.searchTerm = "";
    $scope.pageChanged();
  };

  $scope.search = function(searchTerm) {
    $scope.pageChanged();
  };

  $scope.archiveCategory = function(id) {
    swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
      allowOutsideClick: true
    },
    function() {
      categoryService.archiveCategory(id)
        .then(function() {
          $state.go($state.current, {}, {reload: true})
            .then(function() {
              swal({
              title: "Deleted!",
              type: "success",
              allowOutsideClick: true
            });
          })
        }, function(response) {
          swal({
            title: "Oops...",
            text: "Something went wrong!",
            type: "error",
            allowOutsideClick: true
          });
      });
    });
  };

  $scope.submit = function (id) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'question-set/category-form.html',
      controller: 'CategoryFormController',
      size: 'lg',
      resolve: {
        category: function(categoryService) {
          if (angular.isDefined(id)) {
            return categoryService.getCategory(id)
              .then(function(response) {
                return response.data.category
              });
          }
          else {
            undefined;
          }

        },
      }
    });
  };
};