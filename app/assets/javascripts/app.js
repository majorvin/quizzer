var quizzer = angular.module("quizzer", [
  "templates",
  "ui.router",
  "ui.bootstrap",
  "ngAnimate"
]);

quizzer.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('categories', {
    url: '/question_set/categories',
    templateUrl: 'question-set/category/categories.html',
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
    templateUrl: 'question-set/category/category-detail.html',
    controller: 'CategoryDetailController',
    resolve: {
      questions: function(questionService, $stateParams){
        if ($stateParams.id === "") { return []; };

        return questionService.getCategoryQuestions({category_id: $stateParams.id})
                .then(function(response) {
                  return response.data;
                }, function(response) {
                  console.log(response);
                  //TODO Add error
                });
      },
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
  .state('available', {
    url: '/exam/available',
    templateUrl: 'exam/available.html',
    controller: 'ExamAvailableController',
    resolve: {
      availableExams: function(examListService){
        return examListService.getAvailableList()
          .then(function(response) {
            return response.data;
          });

        // TODO Add error
      }
    }
  })
  .state('examStart', {
    url: '/exam/start/:id',
    templateUrl: 'exam/start.html',
    controller: 'ExamStartController',
    resolve: {
      questions: function(examListService, $stateParams){
        return examListService.findExam({list_id: $stateParams.id})
          .then(function(response) {
            return response.data.list.questions;
          });
        // TODO Add error
      }
    }
  })

  // $urlRouterProvider.otherwise('/questions');
})
.run(function($rootScope) {
  $rootScope.$on('$stateChangeStart', function() {
    $rootScope.stateLoading = true;
  })

  $rootScope.$on('$stateChangeSuccess', function() {
    $rootScope.stateLoading = false;
  })
});