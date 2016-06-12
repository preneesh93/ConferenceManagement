/**
 * Created by lokeshkumarjr on 11/06/16.
 */


cms.controller('SubmissionController', ['$scope', 'multipartForm', function($scope, multipartForm){
    $scope.project = {};
    $scope.Submit = function(){
        var uploadUrl = '/submission';
        multipartForm.post(uploadUrl, $scope.project);
    }
}]);