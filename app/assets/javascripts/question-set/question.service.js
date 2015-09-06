angular.module("quizzer").factory("questionService", questionservice);

questionservice.$inject = ["$http"];

function questionservice($http) {
  return {
    getAllQuestions: function(params) {
      return $http.get("question_set/questions.json", { params: params });
    },

    getQuestion: function(id) {
      return $http.get("question_set/questions/" + id + ".json");
    },

    createQuestion: function(params) {
      return $http.post("question_set/questions.json", params);
    },

    updateQuestion: function(id, question) {
      return $http.put("question_set/questions/" + id + ".json", params);
    },

    archiveQuestion: function(id) {
      return $http.put("question_set/questions/" + id + "/archive.json");
    }
  };
};