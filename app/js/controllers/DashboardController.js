/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('DashboardController', function($scope,$http,$window,$state){
    console.log("inside dashboard controller");

    var clock = function(){

      function updateClock(){
        var now = moment(),
          second = now.seconds() * 6,
          minute = now.minutes() * 6 + second / 60,
          hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;


        $('#hour').css("transform", "rotate(" + hour + "deg)");
        $('#minute').css("transform", "rotate(" + minute + "deg)");
        $('#second').css("transform", "rotate(" + second + "deg)");
      }

      function timedUpdate () {
        updateClock();
        setTimeout(timedUpdate, 1000);
      }

      timedUpdate();
    }
    clock()
  });

