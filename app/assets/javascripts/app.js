var quizzer = angular.module("quizzer", [
  "templates",
  "ui.router",
  "ui.bootstrap",
  "ngAnimate"
]);

quizzer.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('questions', {
    url: '/question_set/questions',
    templateUrl: 'question-set/questions.html',
    controller: 'QuestionController',
    resolve: {
      questions: function(questionService){
        return questionService.getAllQuestions()
          .then(function(response) {
            return response.data;
          });
        //TODO Add error
      }
    }
  })
  .state('categories', {
    url: '/question_set/categories',
    templateUrl: 'question-set/categories.html',
    controller: 'CategoryController',
    resolve: {
      categories: function(categoryService){
        return categoryService.getAllCategories()
          .then(function(response) {
            return response.data;
          });

        //TODO Add error
      }
    }
  })
  .state('categoryDetail', {
    url: '/question_set/categories/:id',
    templateUrl: 'question-set/category-detail.html',
    controller: 'CategoryDetailController',
    resolve: {
      category: function(categoryService, $stateParams){
        if ($stateParams.id !== "") {
          return categoryService.getCategory($stateParams.id)
            .then(function(response) {
              return response.data;
            }, function(response) {
              console.log(response);
              //TODO Add error
            });
        }
        else {
          return undefined;
        }

      }
    }
  })
  .state('categoryDetailQuestion', {
    url: '/question_set/categories/:id/questions',
    templateUrl: 'question-set/category-detail-questions.html',
    controller: 'CategorDetailQuestionController',
    resolve: {
      questions: function(categoryService, $stateParams){
        return categoryService.showQuestions($stateParams.id, {})
          .then(function(response) {
            return response.data;
          }, function(response) {
            console.log(response);
            //TODO Add error
          });
      }
    }
  })

  // $urlRouterProvider.otherwise('/questions');
});