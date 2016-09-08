 /**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('DashboardController', function($scope,$http,$window,currentuser,config){
    $scope.reviewBtn = true;
    $scope.subBtn = true;
    $scope.conf = undefined
    $scope.assignedSubDetails=[]
    currentuser.data.roles.author=true;
    $scope.reviewer = currentuser.data.roles.reviewer?true:false;
    $scope.assigned_submissions= currentuser.data.assigned_submissions;
    $scope.list=['1','3','2'];
    var a_id =  currentuser.data._id;
    $scope.submission = {};
    $scope.updateReviewer = function (reviewer) {
      currentuser.data.roles.reviewer = reviewer
      var req = {
        method:'post',
        url:"/api/user/"+currentuser.data.username+"/roles",
        data: currentuser.data.roles
      };
      $http(req).then(function (result) {
        console.log(result);
      }, function(error){
        console.error('Error: '+ error);
      })
    };
    $scope.remove = function (sub,index) {
      $scope.submission.splice(index,1)
      $http.delete("/api/user/submission",{params:{id:sub._id}}).then( function (response){
        console.log(response)
      })
    }
    $scope.headers = [
      {
          name:'Title',
          field:'title'
      },{
          name: 'Author',
          field: 'author_id'
      },{
          name:'Keywords',
          field: 'keywords'
      },{
          name: 'Status',
          field: 'status'
      }
    ];
      
    $scope.listSubmissions = function() {
      var req = {
        method: 'get',
        url: "/api/user/list-sub",
        params: {author_id: a_id}
      };
      $http(req)
        .then(
          function(result){
            $scope.submission = result.data;
          }, function (error) {
            console.error('Error: ' + error);
          });
    };
    $scope.loadSubDetails = function(subid){
      var req = {
        method: 'get',
        url: '/api/user/submissions',
        params: {submissionId : subid}
      };
      $http(req).then(function (result) {
        $scope.assignedSubDetails.push(result.data)
      },function (error) {
        console.error('Error: ' + error);
      })
    };
    $scope.assigned_submissions.forEach(function (sub) {
      $scope.loadSubDetails(sub)
    })
    var currDate = new Date();
    $http.get("/api/chair/deadlines?conference="+config.conference_name).then(function(response){
      $scope.conf={}
      if(response.data != null)
      {
        $scope.conf.sub = (response.data.submission_deadline)? new Date(response.data.submission_deadline) : undefined;
        $scope.conf.rev = (response.data.review_deadline)? new Date(response.data.review_deadline) : undefined;
        if(currDate > $scope.conf.rev)
        {
          $scope.reviewBtn = false;
        }
        if(currDate > $scope.conf.sub)
        {
          $scope.subBtn = false;
        }
      }
      },function (error) {  console.log(error)  }
     )

  });