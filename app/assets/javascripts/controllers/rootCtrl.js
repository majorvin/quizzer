angular.module("quizzer")
.controller("RootCtrl", function($rootScope, alertService, $scope) {
  // root binding for alertService
  $rootScope.closeAlert = alertService.closeAlert;

  // Hack to remove the alert message when changing the view
  $scope.$on('$stateChangeSuccess', function () {
    if (alertService.get().length > 0) {
      alertService.clear();
    }
  });
});