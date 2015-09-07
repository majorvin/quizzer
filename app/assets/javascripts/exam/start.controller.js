angular.module('quizzer').controller('ExamStartController', ExamStartController);


function ExamStartController($scope, $state, questions) {
  $scope.questions = questions;
};