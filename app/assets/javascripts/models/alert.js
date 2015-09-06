angular.module("quizzer").factory('alertService', function($rootScope) {
  var alertService = {};

  // create an array of alerts available globally
  $rootScope.alerts = [];

  return {
    add: function(type, msg) {
      $rootScope.alerts.push({
        type: type,
        msg: msg,
        close: function() {
          return alertService.closeAlert(this);
        }
      });
    },

    closeAlert: function(alert) {
      return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
    },

    closeAlertIdx: function(index) {
      return $rootScope.alerts.splice(index, 1);
    },

    closeAlert: function(index) {
      $rootScope.alerts.splice(index, 1);
    },

    clear: function(){
      $rootScope.alerts = [];
    },

    get: function(){
      return $rootScope.alerts;
    }
  };
});