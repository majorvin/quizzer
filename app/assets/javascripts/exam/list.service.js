angular.module("quizzer").factory("examListService", examListService);

examListService.$inject = ["$http"];

function examListService($http) {
  return {
    getAvailableList: function(params) {
      return $http.get("exam/list/available.json", { params: params });
    },

    startExam: function(params) {
      return $http.post("exam/list.json", params);
    },

    findExam: function(params) {
      return $http.get("exam/list/find.json", { params: params });
    }
  };
};