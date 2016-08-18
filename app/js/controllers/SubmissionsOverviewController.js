/**
 * Created by lokeshkumarjr on 16/08/16.
 */

angular.module('cms')
    .controller('ProfileDetailsController', function($stateParams,$scope, $http, $timeout) {
        console.log("Profile Control!");
        $scope.loadSubmissionDetails = function () {
            var req = {
                method: 'get',
                url: "/api/user/submission",
                params: {author_id: $scope.sub.author_id}
            };
            $http(req).then(function (result) {
                console.log("Retrieving Submission List")
                $scope.sub = result.data;
                console.log($scope.sub);
            }, function (error) {
                console.error('Error: ' + error);
            })
        };

       $scope.update = function(){
            var req = {
                method:'post',
                url:"api/user/submission",
                params: {_id: $scope.sub._id}
            };
            $http(req).then(function (result) {
                console.log(result);
                $scope.success=true;
                $timeout(function () { $scope.success = false; }, 2000);
            }, function(error){
                console.error('Error: '+ error);
            })
        };   
    });


