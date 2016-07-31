/**
 * Created by lokeshkumarjr on 31/07/16.
 */

angular.module('cms')
    .controller('SubmissionsOverviewController', function($scope,$http,$state){
        console.log("inside submissionsoverview controller");
        $scope.addnew = function()
        {
            $state.go('/views/submission.html');
        }
    });
