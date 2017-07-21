'use strict';

angular.module('app').controller('ctrlRegister', ['$scope', '$rootScope','$location','registerService', function($scope, $rootScope, $location, registerService) {
   var self = this;
   self.errorShow = true;
   self.errorVal = "";
   self.registerUser = registerUser;
   
   
   
   function registerUser() {
	   
	   var alphaNumeric = /^[a-zA-Z0-9_ ]*$/;
	   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
	   var phoneno = /^\d{10}$/;  
	   
	   if(!(self.userId.match(alphaNumeric))) {
		   self.errorVal = "UserId must be only letters";
		   self.errorShow = false;
	   }
	   else if(!(self.userName.match(alphaNumeric))) {
		   self.errorVal = "UserName must be only letters";
		   self.errorShow = false;
	   }
	   else if(!(self.email.match(mailformat))) {
		   self.errorVal = "Enter a proper email address";
		   self.errorShow = false;
	   }
	   else if(!(self.phone.match(phoneno))) {
		   self.errorVal = "Enter a proper Phone Numbers";
		   self.errorShow = false;
	   }
	   else {
		   self.errorVal = "";
		   self.errorShow = true;
		   
		   registerService.createUser(self.userId, self.userName,self.address, self.phone,self.email,self.password )
           .then(
           function(d) {
               $location.path("/");
           },
           function(errResponse){
               console.error('Error while creating Users');
           }
       );
	   }
   }


}]);


