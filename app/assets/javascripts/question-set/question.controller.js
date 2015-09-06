angular.module("quizzer").controller("QuestionController", QuestionController);

function QuestionController($scope, questionService, questions, $modal, $state) {
  $scope.questions = questions.questions;
  $scope.currentPage = 1;
  $scope.numPerPage = 10;
  $scope.maxSize = 5;
  $scope.totalItems = questions.meta.total_count;

  $scope.pageChanged = function () {
    params = {
      page: $scope.currentPage - 1, // offset
      page_size: $scope.numPerPage,
      keywords: $scope.searchTerm
    };

    questionService.getAllQuestions(params)
      .then(function(response) {
        $scope.questions = response.data.questions;
        $scope.totalItems = response.data.meta.total_count;
    });
  };

  // Display the number in the pagination
  // e.g. Showing X to 100
  $scope.showFrom = function () {
    var number = 0;

    if ($scope.questions.length > 0) {
      number = ($scope.currentPage * $scope.numPerPage) - $scope.numPerPage + 1
    }

    return number;
  };

  // Display the number in the pagination
  // e.g. Showing 1 to Y
  $scope.showTo = function() {
    var number = $scope.currentPage * $scope.numPerPage;

    if ($scope.questions.length < $scope.numPerPage) {
      number = $scope.questions.length;
    }

    return number;
  };

  $scope.$watch("numPerPage", function() {
    $scope.pageChanged();
  });

  $scope.clearSearch = function() {
    $scope.searchTerm = "";
    $scope.pageChanged();
  };

  $scope.search = function(searchTerm) {
    $scope.pageChanged();
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

  $scope.submit = function (id) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'question-set/question-form.html',
      controller: 'QuestionFormController',
      size: 'lg',
      resolve: {
        question: function(questionService) {
          if (angular.isDefined(id)) {
            return questionService.getQuestion(id)
              .then(function(response) {
                return response.data.question
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