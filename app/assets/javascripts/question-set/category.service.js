angular.module("quizzer").factory("categoryService", categoryService);

categoryService.$inject = ["$http"];

function categoryService($http) {
  return {
    getAllCategories: function(params) {
      return $http.get("question_set/categories.json", { params: params });
    },

    getCategory: function(id) {
      return $http.get("question_set/categories/" + id + ".json");
    },

    createCategory: function(params) {
      return $http.post("question_set/categories.json", params);
    },

    updateCategory: function(id, params) {
      return $http.put("question_set/categories/" + id + ".json", params);
    },

    archiveCategory: function(id) {
      return $http.put("question_set/categories/" + id + "/archive.json");
    },

    removeQuestions: function(category_id, question_ids) {
      return $http.put("question_set/categories/" + category_id + "/remove_questions.json", question_ids);
    },

    showQuestions: function(id, params) {
      return $http.get("question_set/categories/" + id + "/show_questions.json", { params: params });
    }
  };
};