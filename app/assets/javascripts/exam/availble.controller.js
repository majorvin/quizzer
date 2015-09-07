angular.module('quizzer').controller('ExamAvailableController', ExamAvailableController);


function ExamAvailableController($scope, $state, availableExams, examListService) {
  $scope.availableExams = availableExams;

  $scope.startExam = function(id) {
    params ={
      category_id: id
    };

    examListService.startExam(params)
      .then(function(response) {
        $state.go("examStart", { id: response.data.list_id}, {reload: true})
      }, function(response) {
        // TODO fail
      });
  };
};