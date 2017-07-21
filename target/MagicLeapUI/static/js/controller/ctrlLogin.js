'use strict';

angular.module('app').controller('ctrlLogin', ['$scope', '$rootScope','$location', 'loginService', 'homeService', function($scope, $rootScope, $location, loginService, homeService) {
    var self = this;
    self.getUser = getUser;
    self.registerClick = registerClick;

    function getUser(){
    	loginService.getUser(self.userId, self.password)
            .then(
            function(d) {
           	 $rootScope.logoutShow = false;
           	$rootScope.userId = self.userId;
                $location.path("/posts");
            },
            function(errResponse){
                console.error('Error while fetching Users');
            }
        );
    }
    
    
    function registerClick() {
    	 $location.path("/register");
    }
    
    
    $rootScope.logoutClick = function() {

    	homeService.logout()
        .then(
        function(data) {
        	 $location.path("/");
        	 $rootScope.logoutShow = true;
        },
        function(errResponse){
            console.error('Error while logging out the user');
        });
		
    }


}]);


