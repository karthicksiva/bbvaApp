angular.module('starter.controllers', [])

.controller('GroupCtrl', function($scope, $http, $location, $state) {
		var url = "https://apis.bbvabancomer.com/datathon/zipcodes/11000/age_distribution?date_min=20131101&date_max=20140430&group_by=month&category=all";
	//app.bbva.mygroup
	//3f26b7f69ed89c9b13d39b22c8c3f546cbef743a
	//var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
	var encodedString = btoa("app.bbva.mygroup:3f26b7f69ed89c9b13d39b22c8c3f546cbef743a");
	var authKeyValue = "Basic " + encodedString;
   /* $http.get(url, {headers: { 'Authorization': authKeyValue }}).
        success(function (data, status, headers, config) {console.log(data);
        }).
        error(function (data, status, headers, config) {
            console.error('Error fetching feed:', data);
        });*/
      $scope.person = {};
       $scope.person.gender = "M";
         $scope.person.shareLocation = "no";
          $scope.person.ageGroup = "2";
           $scope.person.zipCode = "64610";

     $scope.AddItem = function() {
       console.log("--> Submitting form");
       var personObj = {
         ageGroup : $scope.person.ageGroup,
          gender : $scope.person.gender,
          shareLocation  : $scope.person.shareLocation,
          zipCode  : $scope.person.zipCode
       };
       window.personObj = personObj;
       console.log(personObj);
    //   location.href = '#/tab/spend';
      $state.go('tab.spend');
      console.log("sss");

     }

       /*var responsePromise = $http.post("/angularjs-examples/json-test-data.jsp", dataObject, {});
       responsePromise.success(function(dataFromServer, status, headers, config) {
          console.log(dataFromServer.title);
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
     }*/

})

.controller('SpendCtrl', function($scope, $http) {
  $scope.loader = "Loading ... Please wait !";
  var filterValues = {};
  filterValues.gender = personObj.gender;
  filterValues.ageValue = personObj.ageGroup;
  var tempUrl = "https://apis.bbvabancomer.com/datathon/zipcodes/"+ personObj.zipCode +"/cards_cube";
   // var url = "https://apis.bbvabancomer.com/datathon/zipcodes/11000/age_distribution?date_min=20131101&date_max=20140430&group_by=month&category=all";
  // var url = "https://apis.bbvabancomer.com/datathon/zipcodes/11000/cards_cube";
  //app.bbva.mygroup
  //3f26b7f69ed89c9b13d39b22c8c3f546cbef743a
  //var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
  var encodedString = btoa("app.bbva.mygroup:3f26b7f69ed89c9b13d39b22c8c3f546cbef743a");
  var authKeyValue = "Basic " + encodedString;
    $http.get(tempUrl, {headers: { 'Authorization': authKeyValue }, params : {date_min:20140101,date_max:20140303,group_by:'month',category:'mx_fastfood',level:'category'}} ).
        success(function (data, status, headers, config) {
          console.log("success");
          $scope.loader = "";
           drawChartforuser(data,filterValues,"barchart","cardscube");
        }).
        error(function (data, status, headers, config) {
            console.error('Error fetching feed:', data);
        });

personObj
 $scope.dummy = {};

})
.controller('ShortsCtrl', function($scope) {

})
/*
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})*/

.controller('ChooseCtrl', function($scope) {
});
