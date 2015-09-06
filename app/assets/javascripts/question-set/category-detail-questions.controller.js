angular.module("quizzer").controller("CategorDetailQuestionController", CategorDetailQuestionController);

function CategorDetailQuestionController($scope, $state, questions) {
  $scope.questions = questions.questions;

};