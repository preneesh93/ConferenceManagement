/**
 * Created by lokeshkumarjr on 11/06/16.
 */

angular.module('cms')
.controller('SubmissionController', ['$state', '$rootScope', '$scope', 'multipartForm', function($state, $rootScope, $scope, multipartForm){
    console.log("inside submission controller");
    $scope.project = {};
    $scope.project.keywords = [];
    $scope.Submit = function() {
        var uploadUrl = '/user/submission';
        multipartForm.post(uploadUrl, $scope.project);
        $state.go('root.dashboard');
    }
    $scope.Cancel = function(){
            $state.go('root.dashboard');
    }
}]);