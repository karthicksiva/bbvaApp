angular.module('starter.controllers', [])
.factory("BBVADataAPI", function($http) {
  var url = "https://apis.bbvabancomer.com/datathon/zipcodes/11000/age_distribution?date_min=20131101&date_max=20140430&group_by=month&category=all";
  
  var zipCodesURL = "https://apis.bbvabancomer.com/datathon/info/zipcodes";
  //app.bbva.mygroup
  //3f26b7f69ed89c9b13d39b22c8c3f546cbef743a
  var encodedString = btoa("app.bbva.mygroup:3f26b7f69ed89c9b13d39b22c8c3f546cbef743a");
  var authKeyValue = "Basic " + encodedString;
  var zipCodesArray = [];

  return {
    getBbvaAuthKey: function() {
      return authKeyValue;
    },
    getZipCodesURL: function() {     
      return zipCodesURL;
    },
    getTempUrl: function(zipCode) {
       var tempUrl = "https://apis.bbvabancomer.com/datathon/zipcodes/"+ zipCode +"/cards_cube";
      return tempUrl;
    },
    getZipCodesArray: function() {
      return zipCodesArray;
    },
    getAllZipCodes: function() {
       $http.get(this.getZipCodesURL(), {headers: { 'Authorization': this.getBbvaAuthKey() }} ).
        success(function (data, status, headers, config) {
          zipCodesArray = data.data.zip_codes;
            document.getElementById("saveDetails").disabled = false;
            console.log("Zipcodes loaded");
        }).
        error(function (data, status, headers, config) {
            console.error('Error fetching feed:', data);
        });
    }
     
  };
})
.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits,10);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    }
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $state) {

  $scope.myTitle = 'Template';
  
  $scope.showLoading = function() {
  
        $scope.loadingIndicator = $ionicLoading.show({
            template: 'Please wait ... Work in progress !',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 300,
            showDelay: 500
        }); 
      };
      $scope.hideLoading = function() {
  
         $scope.loadingIndicator.hide();
      };
      $scope.showStep3 = function() {
  
        $state.go('tab.group2');
      };

       
    
  // Form data for the login modal
  /*$scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };*/
})
.controller('GroupCtrl', function($scope, $http, $location, $state, BBVADataAPI) {
      $scope.person = {};
       $scope.person.gender = "M";
         $scope.person.shareLocation = "no";
          $scope.person.ageGroup = "2";
           $scope.person.zipCode = "64610";
           $scope.addLocation = function() {
            navigator.geolocation.getCurrentPosition(
                function(position) {

                  var lat = position.coords.latitude;
                  var long = position.coords.longitude;
                  var  latlng = new google.maps.LatLng(lat, long);
                  var geocoder = new google.maps.Geocoder();
                  geocoder.geocode( { 'latLng': latlng}, function(results, status){
                     if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                                  for(var i=0; i<results[0].address_components.length; i++) {
                                      var postalCode = results[0].address_components[i].types;
                                      if(results[0].address_components[i].types.indexOf("postal_code") !== -1){
                                         postalCode = results[0].address_components[i].long_name;
                                         console.log(postalCode);
                                      }
                                     
                                   }
                               }
                     } else {
                        console.log("Geocode was not successful: " + status);
                     }
                  });
                },
                function() {
                    console.log('Error getting location');
                });
            };
    
BBVADataAPI.getAllZipCodes();
     $scope.AddItem = function() {
       $scope.userPref.submitted = false;
       $scope.userPref.notAvailable = false;
       console.log("--> Submitting form");
       var zipCodesArray = BBVADataAPI.getZipCodesArray();
       var personObj = {
         ageGroup : $scope.person.ageGroup,
          gender : $scope.person.gender,
          shareLocation  : $scope.person.shareLocation,
          zipCode  : $scope.person.zipCode
       };

         if ($scope.userPref.$valid) {
         console.log("valid form");
         if(zipCodesArray !== []){
          var isZipValid = zipCodesArray.indexOf(personObj.zipCode);
          console.log(isZipValid);
            if(isZipValid !== -1){
               window.personObj = personObj;
               console.log(personObj);
               $state.go('tab.group2');
            }
            else{
               $scope.userPref.submitted = true;
               $scope.userPref.notAvailable = true;
            }
         }
       } else {
         $scope.userPref.submitted = true;
        }
     
      
     }
})

.controller('SpendCtrl', function($scope, $http, BBVADataAPI) {
  if(typeof personObj !== 'undefined'){
      $scope.loader = "Loading ... Please wait !";
    var filterValues = {};
    filterValues.gender = personObj.gender;
    filterValues.ageValue = personObj.ageGroup;
      $http.get(BBVADataAPI.getTempUrl(personObj.zipCode), {headers: { 'Authorization': BBVADataAPI.getBbvaAuthKey() }, params : {date_min:20140101,date_max:20140303,group_by:'month',category:'mx_fastfood',level:'category'}} ).
          success(function (data, status, headers, config) {
            console.log("success");
            $scope.loader = "";
             drawChartforuser(data,filterValues,"barchart","cardscube");
          }).
          error(function (data, status, headers, config) {
             $scope.loader = "There's been an error! Please check your input params and try again";
              console.error('Error fetching feed:', data);
          });

         
       $scope.dummy = {};
  }
  else{
     $scope.loader = "Please save your group preferences first !";
  }

})
.controller('ShortsCtrl', function($scope) {

})

.controller('ChooseCtrl', function($scope) {
});
