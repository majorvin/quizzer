// angular.module("quizzer").controller("CategoryFormController", CategoryFormController);

// function CategoryFormController($scope, $state, $modalInstance, category, categoryService) {
//   preFillForm();
//   $scope.onlyNumbers = /^\d+$/;

//   function preFillForm() {
//     if (angular.isDefined(category)) {
//       $scope.title = "Update Category";
//     }
//     else {
//       $scope.title = "Create Category";
//     }
//   };

//   $scope.ok = function(invalid) {
//     if (invalid) { return; };

//     params = {
//       category: {
//         name: $scope.name,
//         description: $scope.description,
//         enable: $scope.enable,
//         max_question: $scope.max_question,
//       }
//     };

//     angular.isUndefined(category) ? create(params) : update(params);
//   };

//   function create(params) {
//     categoryService.createCategory(params)
//       .then(function(response) {
//         $modalInstance.close("ok");
//         $state.go("categoryDetail", { id: response.data.id }, {reload: true})
//           .then(function() {
//             swal({
//               title: "Added!",
//               type: "success",
//               allowOutsideClick: true
//             });
//           });
//       }, function(response) {
//         $scope.showError = true;
//         $scope.errors = response.data.errors;
//       });
//   };
// };