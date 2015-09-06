angular.module("quizzer").controller("CategoryDetailController", CategoryDetailController);

function CategoryDetailController($scope, $state, category, categoryService) {
  preFillForm();
  $scope.onlyNumbers = /^\d+$/;

  function preFillForm() {
    if (angular.isDefined(category)) {
      $scope.category = category.category;
      $scope.questions = $scope.category.questions;
      $scope.name = $scope.category.name;
      $scope.description = $scope.category.description;
      $scope.max_question = $scope.category.max_question;
      $scope.enable = $scope.category.enable;
      $scope.totalItems = $scope.questions.length;
      $scope.currentPage = 1;
      $scope.maxSize = 5;
      $scope.displayedQuestions = $scope.questions.slice(0, 10)
    }
    else {
    }
  };

  $scope.pageChanged = function() {
    var from = $scope.currentPage - 1;
    $scope.displayedQuestions = $scope.questions.slice(from * 10, $scope.currentPage * 10)
  };

  $scope.ok = function(invalid) {
    if (invalid) { return; };

    params = {
      category: {
        name: $scope.name,
        description: $scope.description,
        enable: $scope.enable,
        max_question: $scope.max_question
      }
    };

    angular.isUndefined(category) ? create(params) : update(params);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.clickCheckAll = function() {
    if ($scope.selectedAll) {
      $scope.selectedAll = false;
    } else {
      $scope.selectedAll = true;
    }

    angular.forEach($scope.questions, function (question) {
        question.selected = $scope.selectedAll;
    });
  };

  $scope.questionNotSelected = function() {
    if ($("input[name='questions']:checked").length === 0) {
      return true;
    }

    return false;
  };

  $scope.removeQuestions = function() {
    if ($scope.questionNotSelected()) { return; }

    var question_ids = [];

    $scope.questions.map(function(q) {
      if (q.selected) {
        question_ids.push(q .id)
      }
    });

    params = {
      question_ids: question_ids
    }

    swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, remove it!",
      closeOnConfirm: false,
      allowOutsideClick: true
    },
    function() {
      categoryService.removeQuestions($scope.category.id, params)
        .then(function() {
          $state.go($state.current, {}, {reload: true})
            .then(function() {
              swal({
              title: "Removed!",
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

  function create(params) {
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

  function update(params) {
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