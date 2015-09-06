angular.module("quizzer").controller("CategoryDetailController", CategoryDetailController);

function CategoryDetailController($scope, $state, $modal, category, questions, categoryService, questionService) {
  preFillForm();
  $scope.onlyNumbers = /^\d+$/;

  function preFillForm() {
    if (angular.isDefined(category)) {
      $scope.category = category.category;
      $scope.questions = questions.questions;
      $scope.name = $scope.category.name;
      $scope.description = $scope.category.description;
      $scope.max_question = $scope.category.max_question;
      $scope.enable = $scope.category.enable;
      $scope.totalItems = questions.meta.total_count;
      $scope.currentPage = 1;
      $scope.maxSize = 5;
      $scope.numPerPage = 10;
      $scope.action = "update";
    }
    else {
      $scope.action = "create";
    }
  };

  $scope.pageChanged = function() {
    params = {
      page: $scope.currentPage - 1, // offset
      page_size: $scope.numPerPage,
      keywords: $scope.searchTerm,
      category_id: $scope.category.id
    };

    questionService.getCategoryQuestions(params)
      .then(function(response) {
        $scope.questions = response.data.questions;
        $scope.totalItems = response.data.meta.total_count;
    });
  };

  $scope.clearSearch = function() {
    $scope.searchTerm = "";
    $scope.pageChanged();
  };

  $scope.search = function(searchTerm) {
    $scope.currentPage = 1;
    $scope.pageChanged();
  };

  $scope.$watch("numPerPage", function() {
    $scope.currentPage = 1;
    $scope.pageChanged();
  })

  // Display the number in the pagination
  // e.g. Showing X to 100
  $scope.showFrom = function () {
    if ($scope.action === "create") { return; };

    var number = 0;

    if ($scope.questions.length > 0) {
      number = ($scope.currentPage * $scope.numPerPage) - $scope.numPerPage + 1
    }

    return number;
  };

  // Display the number in the pagination
  // e.g. Showing 1 to Y
  $scope.showTo = function() {
    if ($scope.action === "create") { return; };

    var number = $scope.currentPage * $scope.numPerPage;
    var totalPages = $scope.totalItems / $scope.numPerPage;

    if (Math.ceil(totalPages) === $scope.currentPage ) {
      number = $scope.totalItems;
    }

    return number;
  };

  $scope.submitCategory = function(invalid) {
    if (invalid) { return; };

    params = {
      category: {
        name: $scope.name,
        description: $scope.description,
        enable: $scope.enable,
        max_question: $scope.max_question
      }
    };

    angular.isUndefined(category) ? createCategory(params) : updateCategory(params);
  };

  $scope.archiveQuestion = function(id) {
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
      questionService.archiveQuestion(id)
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

  $scope.submitQuestion = function (categoryId, questionId) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'question-set/question/question-form.html',
      controller: 'QuestionFormController',
      size: 'lg',
      resolve: {
        categoryId: function() {
          return categoryId;
        },
        question: function(questionService) {
          if (angular.isDefined(questionId)) {
            return questionService.getQuestion(questionId)
              .then(function(response) {
                return response.data.question
              });
          }
          else {
            undefined;
          }
        }
      }
    });
  };

  function createCategory(params) {
    categoryService.createCategory(params)
      .then(function(response) {
        $state.go($state.current, { id: response.data.id }, {reload: true})
          .then(function() {
            swal({
              title: "Added!",
              type: "success",
              allowOutsideClick: true
            });
          });
      }, function(response) {
        $scope.showError = true;
        $scope.errors = response.data.errors;
      });
  };

  function updateCategory(params) {
    categoryService.updateCategory($scope.category.id, params)
      .then(function(response) {
        $state.go($state.current, {}, {reload: true})
          .then(function() {
            swal({
              title: "Updated!",
              type: "success",
              allowOutsideClick: true
            });
          });
      }, function(response) {
        $scope.showError = true;
        $scope.errors = response.data.errors;
      });
  };
};