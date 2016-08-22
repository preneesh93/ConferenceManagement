/**
 * Created by bvvis on 20-Jun-16.
 */
angular.module('cms')
    .controller('ReviewController',['$scope','$http', '$location', function($scope,$http,$location) {

        $scope.reviewerExpertise = [
            { label: 'Not familiar w/ the topic', value: '1' },
            { label: 'Familiar', value: '2' },
            { label: 'Average', value: '3' },
            { label: 'Good', value: '4' },
            { label: 'Expert', value: '5' }
        ];

        $scope.overallEvaluation = [
            { label: 'strong reject', value: '1' },
            { label: 'reject', value: '2' },
            { label: 'onHold', value: '3' },
            { label: 'accept', value: '4' },
            { label: 'strong accept', value: '5' }
        ];

        $scope.submitReview = function(){
            $scope.data=JSON.stringify($scope.reviewer);
            var req = {
                method: 'post',
                url: "/review/submit",
                data: $scope.data
            };
            // Send it
            $http(req)
                .then(
                    function(response){ // Success callback
                        console.log(response);
                        if(response.data._id){
                            $scope.showSuccess=true;
                        }
                    },
                    function(response){ //Error callback
                        console.log(response)
                    }
                );
        };

    }]);